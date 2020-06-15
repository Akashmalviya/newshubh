import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/_services/user.service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-notification-model',
  templateUrl: './notification-model.component.html',
  styleUrls: ['./notification-model.component.scss']
})
export class NotificationModelComponent implements OnInit {

  filteredArray: any[] = []

  defaultRecords: any = 5;


  constructor(@Inject(MAT_DIALOG_DATA) public id: any,
  private  _user : UserService,
  public dialogRef: MatDialogRef<NotificationModelComponent>
  ){

  }
  notification = [];
   // MatPaginator Output
   pageEvent: PageEvent;

  ngOnInit() {
    this.notification = this.id.notification
    this.filteredArray = this.notification.slice(0, this.defaultRecords);
   }

   onPaginateChange($event) {
    this.filteredArray =  this.notification.slice($event.pageIndex*$event.pageSize,
      $event.pageIndex*$event.pageSize + $event.pageSize);
  }
  readNotification(id){
    this._user.readNotification(id).subscribe()
  }


}
