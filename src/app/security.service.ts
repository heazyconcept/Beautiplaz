import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Users } from './register/register.component';
import { loginData } from './login/login.component';
import * as myGlobals from './globals';
@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  
  constructor(private http: HttpClient) { }
  register(user: Users){
    return this.http.post<any>(myGlobals.URL + "/security/Register", user);
  }
  login(logindata: loginData){
    return this.http.post<any>(myGlobals.URL + "/security/Login", logindata);
  }
}
