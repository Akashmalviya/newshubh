import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl =  environment.baseUrl;
  current = new Subject<any>();
  history = new Subject<any>();
  complete = new Subject<any>();

  constructor(private http : HttpClient) { }

  orderList(){
    const id = JSON.parse(localStorage.getItem('currentUser')).data._id;
    const url = this.baseUrl+`currentOrderList/${id}`;
    return this.http.get(url)
  }

  orderHistory(){
    const id = JSON.parse(localStorage.getItem('currentUser')).data._id;
    const url = this.baseUrl+`orderHistory/${id}`;
    return this.http.get(url)
  }

  completedOders(){
    const id = JSON.parse(localStorage.getItem('currentUser')).data._id;
    const url = this.baseUrl+`completedOders/${id}`;
    return this.http.get(url)
  }

  scheduledOrderList(){
    const id = JSON.parse(localStorage.getItem('currentUser')).data._id;
    const url = this.baseUrl+`scheduledOrderList/${id}`;
    return this.http.get(url)
  }
    // view cancelation charge
    viewCancelCharge(data){
      const url = this.baseUrl+`viewCancelationCharge`;
      return this.http.put(url,data)
    }

  cancelOrder(data){
    const url = this.baseUrl+'cancelOrder';
    return this.http.put(url,data);
  }

  viewOrder(id){
    const url =this.baseUrl+`viewOrder/${id}`;
    return this.http.get(url)
  }
//create Order
postOrder(order){

  const id = JSON.parse(localStorage.getItem('currentUser')).data._id;
   return this.http.post(this.baseUrl+`createOrder/${id}`, order);
 }

  //get competed orders api
  completedOrdersList(){
    const id = JSON.parse(localStorage.getItem('currentUser')).data._id;
    const url = this.baseUrl+`completedOders/${id}`;
    return this.http.get(url)

  }

  //calculate Fare
  calculateFare(data){
    const id = JSON.parse(localStorage.getItem('currentUser')).data._id;
   const url = this.baseUrl+`calculateRate/${id}`
   return this.http.put(url,data)
  }

  // return order api requests
  returnOrderWhenUserChangeHisMind(data,orderId){
    const id = JSON.parse(localStorage.getItem('currentUser')).data._id;
    const url = this.baseUrl+`returnOrderWhenUserChangeHisMind?companyId=${id}&orderId=${orderId}`;
   return this.http.put(url,data)
  }

  viewReturnOrderEstimatedCharge(data,orderId){
    const id = JSON.parse(localStorage.getItem('currentUser')).data._id;
    const url = this.baseUrl+`viewReturnOrderEstimatedCharge?companyId=${id}&orderId=${orderId}`;
    return this.http.put(url,data)
  }

  returnOrderWhenWrongItemDelivered(data){
    const url = this.baseUrl+'returnOrderWhenWrongItemDelivered';
    return this.http.post(url,data)
  }

  returnOrderWithOtherReason(data){
    const url = this.baseUrl+'returnOrderWithOtherReason';
    return  this.http.post(url,data)
  }
  packageConcern(id){
    const url = this.baseUrl+`viewPackageConcern/${id}`;
    return  this.http.get(url)
  }
  // return order api requests
}
