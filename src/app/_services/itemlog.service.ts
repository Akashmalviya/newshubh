import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemlogService {

  baseUrl =  environment.baseUrl;

  constructor(private http : HttpClient) { }

   itemWeight(){
    const weightApi = this.baseUrl+"listOfItemWeight";
    return  this.http.get<any>(weightApi);
  }
   itemType(){
    const typeApi = this.baseUrl+"listOfItemType";
    return this.http.get<any>(typeApi);
  }
  itemWeightSelected(){
    const id = JSON.parse(localStorage.getItem('currentUser')).data._id;
    const weightApi = this.baseUrl+`listOfItemWeight/${id}`;
    return  this.http.get<any>(weightApi);
  }
  itemTypeSelected(){
    const id = JSON.parse(localStorage.getItem('currentUser')).data._id;
    const typeApi = this.baseUrl+`listOfItemType/${id}`;
    return this.http.get<any>(typeApi);
  }
}
