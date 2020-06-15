import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { OrdersService } from 'src/app/_services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusModalComponent } from '../status-modal/status-modal.component';

@Component({
  selector: 'app-cancelorder',
  templateUrl: './cancelorder.component.html',
  styleUrls: ['./cancelorder.component.scss']
})
export class CancelorderComponent  {

  viewCharge: any = {}
  loading = true;

  constructor(@Inject(MAT_DIALOG_DATA) public id: any,private route: ActivatedRoute, public dialogRef: MatDialogRef<CancelorderComponent>,
  private matDialog: MatDialog,
  private order:OrdersService,  private router: Router,
 ){}

 ngOnInit() {
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user';

    this.order.viewCancelCharge(this.id).subscribe(res => {this.viewCharge= res; this.loading = false}
    );
 }
 openModal(id) {
  let mat= this.matDialog.open(StatusModalComponent,{
   data: {id}})
}

 closeModal() {
  this.dialogRef.close();
}


  //cancel orders
 cancelOrder(){
      this.order.cancelOrder(this.id).subscribe(
        res=>{
          this.dialogRef.close();
          this.openModal(3)

            })
      }

}
