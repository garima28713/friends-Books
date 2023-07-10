import { Component } from '@angular/core';
import { registerForm } from '../../../models/registerFormModel'
import { HttpClient } from '@angular/common/http';
import { CallapiService } from 'src/app/services/callapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private _callapi:CallapiService, private router: Router){}
  registerform:registerForm = {
    "firstName":"",
    "lastName":"",
    "email":"",
    "dob":"",
    "gender":"",
    "password":""
  }
  // confirmPassword:string="";
  obj:any = {"confirm":"", "agreed":false}
//   function () {
//   'use strict'
//   const forms = document.querySelectorAll('.requires-validation')
//   Array.from(forms)
//     .forEach(function (form) {
//       form.addEventListener('submit', function (event) {
//         // if (!form.checkValidity()) {
//           event.preventDefault()
//           event.stopPropagation()
//         // }

//         form.classList.add('was-validated')
//       }, false)
//     })
// }
registerFormSubmit(){
  console.log("button is clicked")
  this._callapi.registerNewUser(this.registerform).subscribe((d:any)=>{
    if(d.message === 'User registered successfully'){
      console.log('User has been registered successfully');
      this.router.navigateByUrl('login');  
    }
    else{
      console.log('Error in registering new user');
      this.router.navigateByUrl('register');  
    }
  })
}

}
