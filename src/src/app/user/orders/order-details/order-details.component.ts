import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/_services/orders.service';
import { ActivatedRoute, Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit  {

  invoices: boolean = false;

  constructor(private order : OrdersService , private route : ActivatedRoute, private router : Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

   }
  private id
  orderData : any = {data : {}}
  concern = []
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
   console.log(this.route.snapshot.url[2].path);
    if (this.route.snapshot.url[2].path === 'invoicesDetails') {
      this.invoices = true;
    }
    let response : any ={}
    this.order.viewOrder(this.route.snapshot.paramMap.get('id')).subscribe(res=>  {
      response =res
      this.orderData = response.data
    })
    this.order.packageConcern(this.id).subscribe((res : any)=>{ this.concern = res.data
    console.log(this.concern);
    })

  }

}
