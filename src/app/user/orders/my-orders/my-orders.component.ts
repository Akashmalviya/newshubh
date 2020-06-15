import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/_services/orders.service';
import { MatDialog } from '@angular/material/dialog';
import { CancelorderComponent } from 'src/app/_modal/cancelorder/cancelorder.component';
import { Router } from '@angular/router';
import { SuborderlistComponent } from 'src/app/_modal/suborderlist/suborderlist.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
declare var $: any;
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  dataType = 'Current Orders'

  constructor() { }



  ngOnInit() {

  }
  onclick(data){
    this.dataType = data;
  }

}
