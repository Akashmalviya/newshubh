import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CancelorderComponent } from '../cancelorder/cancelorder.component';

@Component({
  selector: 'app-suborderlist',
  templateUrl: './suborderlist.component.html',
  styleUrls: ['./suborderlist.component.scss']
})
export class SuborderlistComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public id: any,private matDialog: MatDialog, public dialogRef: MatDialogRef<SuborderlistComponent>
 ){}

  ngOnInit() {
    console.log(this.id);

  }
  openModal(id : any) {
    // this.dialogRef.close();
    let mat= this.matDialog.open(CancelorderComponent,{
     data: {orderId : id,

  companyId : JSON.parse(localStorage.getItem('currentUser')).data._id,
   }
  ,width: '400px'}
   )
   mat.afterClosed().subscribe(result => {
     this.dialogRef.close();
  });
 }

}
