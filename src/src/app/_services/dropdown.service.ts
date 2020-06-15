import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../_models/countries';

import { State } from '../_models/states';
import { cities } from '../_models/cities';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  
  baseUrl =  environment.baseUrl;
  private _url: string = "/assets/data/";

  constructor(private http : HttpClient) { }

 
  getCountry(): Observable<Country[]>{
    return this.http.get<Country[]>(`${this._url}countries.json`)
}
getState(): Observable<State[]>{
  return this.http.get<State[]>(`${this._url}states.json`)
}
getCites(): Observable<cities[]>{
  return this.http.get<cities[]>(`${this._url}cities.json`)
}
}
