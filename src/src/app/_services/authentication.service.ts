import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models/user';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
//    private loginApi = "http://18.222.134.154:3000/companyLogin";
   baseUrl =  environment.baseUrl;
   private loginApi = this.baseUrl+"companyLogin";

   //;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;


    constructor(private http: HttpClient,  private router : Router ,
      private alertService: AlertService) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }
    public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }
    public  currentUserValuedata(userData) {
      this.currentUserSubject.next(userData);
    }
    login(username, password) {


        return this.http.post<any>(this.loginApi, { 'companyEmail' : username, 'password': password})
            .pipe(map(user => {

                    if(user.status==1){
                                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));

                this.currentUserSubject.next(user);
                return user;
                    }if(user.status==0){
                        this.alertService.error('Enter correct Email and Password')
                        return user
                    }

            }));
    }

    isLoggedIn(){
      return !!localStorage.getItem('currentUser')
    }

    logout() {

        localStorage.removeItem('token');

        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(['home'])

    }
    // logout() {
    //     if(confirm('Are you sure you want to logout ?') == true){

    //       // remove user from local storage and set current user to null
    //       localStorage.removeItem('token');

    //       localStorage.removeItem('currentUser');
    //       this.currentUserSubject.next(null);
    //       this.router.navigate(['/login'])
    //     }
    //   }


    changePassword(Data){
      let id = JSON.parse(localStorage.getItem('currentUser')).data._id;

       const changePass = this.baseUrl+`changeCompanyPassword/${id}`;

        return  this.http.put(changePass,Data);
    }
}
