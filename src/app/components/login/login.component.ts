import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CallapiService } from 'src/app/services/callapi.service';
import { loginForm } from 'src/models/loginFormModel';
import { loginResponse } from 'src/models/loginResponseModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  constructor(private _callapi:CallapiService, private router:Router){}


  loginform:loginForm = {
    "email":"",
    "password":""
  }

  loginFormSubmit(){
    this._callapi.loginUser(this.loginform).subscribe((d:loginResponse)=>{
      if(d.token)
      {
        console.log('login successful');
        localStorage.setItem('token',d.token);
        localStorage.setItem('currentuser',d._id);
        localStorage.setItem('role',d.isAdmin?'Admin':'NormalUser');
        localStorage.setItem('userName',d.firstName+' '+d.lastName)
        this.router.navigateByUrl('home');
      }
      else{
        console.log('login failure');
        this.router.navigateByUrl('login');
      }

    })
  }
}
