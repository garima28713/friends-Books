import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CallapiService } from 'src/app/services/callapi.service';
import { forgetPassForm } from 'src/models/forgetPassModel';
import { forgetPassResponse } from 'src/models/forgetPassResponseModel';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent {

  constructor(private _callapi: CallapiService, private router: Router) { }


  forgetpassform: forgetPassForm = {
    "email": ""
  }
  obj: any = {
    "dob": ""
  }

  forgetPassFormSubmit() {
    this._callapi.findUserByEmail(this.forgetpassform).subscribe((d: forgetPassResponse[]) => {
      if (d[0].dob.toString().includes(this.obj.dob.toString())) {
        localStorage.setItem('currentuser',d[0]._id);
        this.router.navigateByUrl('resetpassword')
      }

      else {
        console.log('Date of Birth not matched');
      }

    })


  }
}
