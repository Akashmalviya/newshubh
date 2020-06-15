import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../_models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
 
  baseUrl =  environment.baseUrl;

  postOrder(order){

    const id = JSON.parse(localStorage.getItem('currentUser')).data._id;
     return this.http.post(this.baseUrl+`createOrder/${id}`,order );
   }

}
