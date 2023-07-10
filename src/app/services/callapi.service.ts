import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLs } from '../../configuration/config'
import { registerForm } from 'src/models/registerFormModel';
import { loginForm } from 'src/models/loginFormModel';
import { loginResponse } from 'src/models/loginResponseModel';
import { forgetPassForm } from 'src/models/forgetPassModel';
import { forgetPassResponse } from 'src/models/forgetPassResponseModel';
import { updatePassForm } from 'src/models/updatePassModel';


@Injectable({
  providedIn: 'root'
})
export class CallapiService {

  constructor(private http: HttpClient){}
  registerUrl:string = "";
  loginUrl:string = "";
  forgetPassUrl:string = "";
  updatePassUrl: string = "";

  registerNewUser(user: registerForm){
    this.registerUrl = URLs.register;
    console.log("calling this endpoint ", this.registerUrl)
    console.log("Request payload", user)
    return this.http.post(this.registerUrl, user);
  }

  loginUser(user: loginForm){
    this.loginUrl = URLs.login;
    console.log("calling this endpoint ", this.loginUrl)
    console.log("Request payload", user)
    return this.http.post<loginResponse>(this.loginUrl, user);
  }

  findUserByEmail(forgetpassform: forgetPassForm){
    this.forgetPassUrl = URLs.forgetpassword;
    console.log("calling this endpoint ", this.forgetPassUrl);
    console.log("Request payload", forgetpassform);
    return this.http.post<forgetPassResponse[]>(this.forgetPassUrl, forgetpassform);
  }

  updateUserPassword(updatepassform: updatePassForm){
    this.updatePassUrl = URLs.updatepassword;
   
    console.log("Request payload", updatepassform);
    const userId = localStorage.getItem('currentuser');
    console.log("calling this endpoint ", this.updatePassUrl + userId);
    return this.http.put<object>( this.updatePassUrl+ userId, updatepassform);
  }
}
