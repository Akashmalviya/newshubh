import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { CancelorderComponent } from 'src/app/_modal/cancelorder/cancelorder.component';
import { MatDialog } from '@angular/material/dialog';
import { OrdersService } from 'src/app/_services/orders.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { SuborderlistComponent } from 'src/app/_modal/suborderlist/suborderlist.component';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit , OnChanges {

  constructor(private matDialog: MatDialog,private order : OrdersService,private auth : AuthenticationService ) { }
  @Input() orderResquest = 'Current Orders';
  @Input() search : string
  flagType:string;
  p: number = 1;
  orderDataCurrent = [];
  orderDataHistory = [];
  orderDataComplete = [];


  loading= true;
  subscriptionCurrent: Subscription;
  subscriptionComplete: Subscription;
  subscriptionhistory: Subscription;

  response : any = {}
  ngOnInit() {
    this.getOrder()
    this.completedOders();
    this.orderHistory();

  }
  ngOnDestroy() {
    this.subscriptionCurrent.unsubscribe();
    this.subscriptionComplete.unsubscribe();
    this.subscriptionhistory.unsubscribe();
}
  ngOnChanges(changes : SimpleChanges){
    this.p = 1;
    this.flagType = changes.orderResquest.currentValue

  }
  completedOders(){
    this.subscriptionComplete = timer(0, 10000).pipe(
      switchMap(() => this.order.completedOders())
    ).subscribe(res=>{
      this.orderDataComplete = this.convertData(res)
      this.loading = false;
       this.order.complete.next(this.convertData(res))
      this.order.complete.subscribe(result => this.orderDataComplete = result)

    });
}

 convertData(res){
  let response : any= res
  let duplicate = []
  let non = []
  let data = [];
  if(response.status == '0'){
    this.auth.logout();
  }
  data = response.data;
  if(data.length != 0){
    for (let i = 0; i <  data.length - 1 ; i++) {

      if(data[i].parentId == data[i+1].parentId)
      {
        duplicate.push(data[i])
      } else non.push(data[i])
   }
   non.push(data[data.length - 1]);

   for (let i = 0; i < non.length; i++) {
     let child = []
     for (let j = 0; j < duplicate.length; j++) {
       if (non[i].parentId == duplicate[j].parentId) {

         child.push(duplicate[j])

       }
     }
     Object.assign(non[i],{child : child})

   }
  }

  return non
}
  orderHistory(){
    this.subscriptionhistory = timer(0, 10000).pipe(
      switchMap(() => this.order.orderHistory())
    ).subscribe(res=>{
      this.order.history.next(this.convertData(res))
      this.orderDataHistory = this.convertData(res)

      this.order.history.subscribe(result => this.orderDataHistory = result)
     this.loading = false;
     })
  }

  getOrder(){
    this.subscriptionCurrent = timer(0, 10000).pipe(
      switchMap(() => this.order.orderList())
    ).subscribe(res=>{
      this.orderDataCurrent = this.convertData(res)
      this.order.current.next(this.convertData(res))
      this.order.current.subscribe(result => this.orderDataCurrent = result)
     this.loading = false;
     })
  }

  openModal(id : any) {
    let mat= this.matDialog.open(CancelorderComponent,{
     data: {orderId : id,
  companyId : JSON.parse(localStorage.getItem('currentUser')).data._id,
   }
  ,width: '400px'}
   )
    mat.afterClosed().subscribe(result => {
    if(this.orderResquest === 'Current Orders') {
      this.getOrder();
    }
    if(this.orderResquest === 'Orders History') {
      this.orderHistory();
    }
    if(this.orderResquest === 'completedOders') {
      this.completedOders();
    }
  });
 }
 SuborderList(data){
  let mat = this.matDialog.open(SuborderlistComponent,{
     data,panelClass: 'custom-dialog-container'
   })
  mat.afterClosed().subscribe(result => {
    if(this.orderResquest === 'Current Orders'){
      this.getOrder();
    }
    if(this.orderResquest === 'Orders History'){
      this.orderHistory()
    }
    if(this.orderResquest == 'completedOders'){
      this.completedOders()
    }
  });

 }

}
