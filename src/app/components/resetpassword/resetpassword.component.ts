import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CallapiService } from 'src/app/services/callapi.service';
import { updatePassForm } from 'src/models/updatePassModel';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent {

  constructor(private _callapi: CallapiService, private router: Router) { }

  updatepassform: updatePassForm = {
    "password": ""
  }
  obj: any = {
    "confirmpassword": ""
  }

  updatePasswordSubmit() {
    console.log("button is clicked")
    this._callapi.updateUserPassword(this.updatepassform).subscribe((d: any) => {
      if (d) {
        console.log('User password has been changed');

        this.router.navigateByUrl('login');
      }
      else {
        console.log('User password has not been changed');
        this.router.navigateByUrl('login');
      }

    })
  }

}
