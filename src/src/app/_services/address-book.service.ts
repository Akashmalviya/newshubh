import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressBookService {

  private id = JSON.parse(localStorage.getItem('currentUser')).data._id;
  constructor(private http : HttpClient) { }
  baseUrl =  environment.baseUrl;
  getAddress(){
    return this.http.get(this.baseUrl + `addressList/${this.id}`)
  }
  saveAddress(data){
    return this.http.post(this.baseUrl + `saveAddress/${this.id}`,data)
  }
  updateAddress(data,id){
    return this.http.put(this.baseUrl + `updateAddress/${id}`,data)
  }
  deleteAddress(id){
    return this.http.patch(this.baseUrl + `deleteAddress/${id}`,{})
  }
}
