import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/_services/orders.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  constructor(private orders : OrdersService) { }
  orderData = []
  search : string = ''
  p : number = 1;
  loading = true;
  ngOnInit() {
    this.orders.completedOders().subscribe(res=>{
      let response : any = res;
      this.orderData = response.data
      this.loading = false;
    })
  }


}
