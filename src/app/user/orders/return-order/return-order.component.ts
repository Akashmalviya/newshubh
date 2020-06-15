import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/_services/orders.service';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { StatusModalComponent } from 'src/app/_modal/status-modal/status-modal.component';
// This lets me use jquery
declare function showAlertModal(data) : any;
declare var $: any;
@Component({
  selector: 'app-return-order',
  templateUrl: './return-order.component.html',
  styleUrls: ['./return-order.component.scss']
})
export class ReturnOrderComponent implements OnInit {
  _id : String
  loading = true;
  clicked = true;
  clickedsub = true;
  constructor(private route : ActivatedRoute,
    private auth :AuthenticationService,
    private matDialog: MatDialog,
    private orders : OrdersService,private alert : AlertService, private router : Router) { }
  private id = JSON.parse(localStorage.getItem('currentUser')).data._id;

  returnData : any = {}
  orderData : any = {}
  hideForm = false;
  otherReason = false;
  wrongItem = false;
  messageRetun = ''
  massage = 'Select Reason to Return'
  fare : any = {}
  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('id');
    let response : any ={}
    this.orders.viewOrder(this.route.snapshot.paramMap.get('id')).subscribe(res=>  {
      console.log(res);


      response =res
      this.orderData = response.data
      if(this.orderData.status == '0'){
        this.auth.logout()
      }

      this.setValue()
    } )


  }

  setValue(){
    this.returnData = {picupCompanyName : this.orderData.dropupCompanyName,
      picupContactPersonName:this.orderData.dropupContactPersonName,
      dropupContactPersonName:this.orderData.picupContactPersonName,
      picuplocation : this.orderData.droplocation,
      picupBusinessMainNumber: this.orderData.dropupBusinessMainNumber,
      dropupBusinessMainNumber:this.orderData.picupBusinessMainNumber,
      dropupMobileNumber:this.orderData.picupMobileNumber,
      picupMobileNumber:this.orderData.dropupMobileNumber,
      picupAddress : this.orderData.dropupStreetAddress,
      picupStreetAddress : this.orderData.dropupAddress2,
      picupCity : this.orderData.dropupCity,
      picupState :   this.orderData.dropupState,
      picPostalCode : this.orderData.dropupPostalCode,
      internalComments : this.orderData.internalComments,
      regularSized: this.orderData.regularSized,
      overSized : this.orderData.overSized,
      driverInstruction : this.orderData.driverInstruction,
      droplocation : this.orderData.picuplocation,
      dropupCompanyName : this.orderData.picupCompanyName,
      dropupStreetAddress : this.orderData.picupStreetAddress,
      dropupAddress2 : this.orderData.picupAddress,
      dropupCity : this.orderData.picupCity,
      dropupState : this.orderData.picupState,
      dropupPostalCode : this.orderData.picPostalCode,
      referenceNumber : this.orderData.referenceNumber,
      distance : this.orderData.distance,
      parentId:this.orderData.parentId,
      orderEstimatedTime : this.orderData.orderEstimatedTime,
      orderDate :this.orderData.orderDate,
     }
  }
return(string){
  if(string == 'otherReason'){
      this.massage = 'Other Reason'
      this.otherReason  = true
      this.hideForm = false
      this.messageRetun = ''
  }
  if(string == 'wrongItem'){
    this.massage = 'Wrong Item'
    this.wrongItem = true
    this.hideForm = false
    this.messageRetun = ''
  }
  if(string == 'mindChange'){

    this.massage = 'Changed My Mind'
    this.hideForm = true
  }

}
showModal():void {
  $('#cost_modal').modal('show');
}
submitRequest(){
  if(this.wrongItem && this.clicked){
    this.clicked = false;
    let data = {
      companyId : this.id,
      orderId : this._id,
      message : this.messageRetun
    }
    this.orders.returnOrderWhenWrongItemDelivered(data).subscribe(res =>
      {
        showAlertModal('Request Submitted Successfully')
        setTimeout(()=>{
          this.router.navigate(['/user/orders'])
        },1000);
      })
  }
  if(this.otherReason && this.clicked){
    this.clicked = false;
    let data = {
      companyId : this.id,
      orderId : this._id,
      message : this.messageRetun
    }
    this.orders.returnOrderWithOtherReason(data).subscribe(res => {
      showAlertModal('Request Submitted Successfully')

      setTimeout(()=>{
        this.router.navigate(['/user/orders'])
      },1000);
    })

  }
  if(this.hideForm){
    this.orders.viewReturnOrderEstimatedCharge(this.returnData,this._id).subscribe(res=>{this.fare = res ;
      this.showModal()
      this.loading = false

    })
    this.loading = true;
  }
}
onSubmit(){
 if(this.clickedsub){
   this.clickedsub = false
  this.orders.returnOrderWhenUserChangeHisMind(this.returnData,this._id).subscribe(res=> {
    showAlertModal('Request Submitted Successfully')

    setTimeout(()=>{
      this.router.navigate(['/user/orders'])
    },2000);
  })
 }
}

openModal(id) {
  let mat= this.matDialog.open(StatusModalComponent,{
   data: {id}})
}


}
