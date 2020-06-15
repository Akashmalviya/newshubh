import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { UserService } from '../../_services/user.service';

import {FormControl} from '@angular/forms';

import {map, startWith, switchMap} from 'rxjs/operators';
import { OrdersService } from 'src/app/_services/orders.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationModelComponent } from 'src/app/_modal/notification-model/notification-model.component';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {
  filteredStates : any = {}
  orderData = []
  stateCtrl = new FormControl();
  toggled: boolean = false;
  count: number
  companyProfileRes: any = {data:{}}
  newOrderNotificationRes: any = {data:[]}
  filteredArray: any[] = [];

  constructor( @Inject(DOCUMENT) private document: Document,

  private user:UserService , private authenticationService : AuthenticationService,private order : OrdersService,  private router: Router,private route : ActivatedRoute,private matDialog: MatDialog) {
    order.orderHistory().subscribe(res=>{
      let response : any =res;
      this.orderData = response.data
    })

   }
   creditRemaningDays ;
  ngOnInit() {
    this.showNotification()
    this.user.getProfile().subscribe(res=>
      {this.companyProfileRes=res
      let NowDate =  Date.now();
      const endDate = new Date(this.companyProfileRes.data.endDateOfCreditLimit)
        this.creditRemaningDays = this.days_between(NowDate,endDate);
    })
  }
  subscriptionNotification: Subscription;
  ngOnDestroy() {
    this.subscriptionNotification.unsubscribe();
}
  readNotification(id){
    this.user.readNotification(id).subscribe()
  }
  showAllNotification(){
    this.matDialog.open(NotificationModelComponent,{
      data : {notification : this.newOrderNotificationRes.data}
    })
  }

   days_between(date1, date2) {

    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1 - date2);

    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);

}
   //show notification
  showNotification() {
    this.subscriptionNotification = timer(0, 10000).pipe(
      switchMap(() => this.user.getNotification())
    ).subscribe(res=>{this.newOrderNotificationRes=res;
      this.filteredArray = this.newOrderNotificationRes.data.reverse().slice(0, 5);
      this.user.Notification.next(this.newOrderNotificationRes.data)
      if(this.newOrderNotificationRes.status == '0'){
        this.authenticationService.logout();
      }
    });
  }


  onchange(search){
    this.router.navigate([`/user/orders/details/${search}`])
  }
  logout() {
    this.authenticationService.logout();

  }

  toggleSidebar(event: any){
    let body = document.getElementsByTagName('body')[0];
    body.classList.toggle("SidebarToggle");



    // this.toggled = !this.toggled;
    // if(this.toggled) {
    //   body.classList.add("SidebarToggle");
    // } else {
    //   body.classList.remove("SidebarToggle");
    // }
  }
}
