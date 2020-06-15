import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = localStorage.getItem('id_token');
    if (!!jwt) {
     req = req.clone({
       setHeaders: {
         Authorization: `Bearer xx.yy.zz`
       }
     });
   }
    return  next.handle(req);
 }
}
