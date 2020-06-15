import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { Observable, Subject} from 'rxjs';
import { RootObject } from 'src/app/_models/user';
import { CardObject } from 'src/app/_models/card';

@Injectable({ providedIn: 'root' })
export class UserService {
  url :string = "https://raw.githubusercontent.com/sagarshirbhate/Country-State-City-Database/master/Contries.json";

  userData = new Subject<any>();
  Notification = new Subject<any>();
  baseUrl =  environment.baseUrl;
  public cardObject = new Subject<CardObject>();

  constructor(private http: HttpClient) { }




    register(user) {
        // return this.http.post(`http://18.222.134.154:3000/companySignUp?input=skip`,user);
        return this.http.post(this.baseUrl+`companySignUp?input=skip`,user);
    }

    getGraph(filter){
      let id = JSON.parse(localStorage.getItem('currentUser')).data._id;
      return this.http.get(this.baseUrl+`graph/${id}?filter=${filter}`);
    }

    getProfile() : Observable<RootObject> {
      let id = JSON.parse(localStorage.getItem('currentUser')).data._id;
        return this.http.get<RootObject>(this.baseUrl+`viewCompanyProfile/${id}`);
      }

      updateProfile(updateData){
      let id = JSON.parse(localStorage.getItem('currentUser')).data._id;
      return this.http.put(this.baseUrl+`updateCompanyProfile/${id}`,updateData);
      }
    delete(id: number) {
        return this.http.delete(`https://maven-api.hireconsultingwhiz.com/api/users/${id}`);
    }
    updateProfilePic(file){

      return this.http.post(this.baseUrl+'documentUpload',file);

    }
    forgotPassword(email){
      return this.http.put(this.baseUrl+'companyForgotPassword',email)
    }

    //country service
    allCountries(): Observable<any>{
      return this.http.get(this.url);
    }

      // showing notification on bell icon
      getNotification(){
        let id= JSON.parse(localStorage.getItem('currentUser')).data._id;
        return this.http.get(this.baseUrl+`userNotificationList/${id}`);
      }
       // update payment details
    updatePayment(addDetail,id){


      return this.http.put(this.baseUrl+`addCardDetail/${id}`, addDetail)
    }

    getCard(){
      let id= JSON.parse(localStorage.getItem('currentUser')).data._id;
      return this.http.get(this.baseUrl+`stripID/${id}`)
    }

    readNotification(id){
      return this.http.put(this.baseUrl+`updateNotificationReadState/${id}`,{});
    }
}
