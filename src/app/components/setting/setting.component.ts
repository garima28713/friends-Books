import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallapiService } from 'src/app/services/callapi.service';
import { NetworkService } from 'src/app/services/network.service';
import { PostsService } from 'src/app/services/posts.service';
import { getuserbyuseridresp } from 'src/models/getUserByUseridModel';
import { updatePassForm } from 'src/models/updatePassModel';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  isLoading:boolean = false;

  constructor(private _networkserv: NetworkService, private router: Router, private _callapi: CallapiService, private _postserv: PostsService, private cdr:ChangeDetectorRef) { }

 

  currentUserData: getuserbyuseridresp = {
    isAdmin: false,
    isActive: true,
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: "",
    photoId: "",
    createdDate: "",
    __v: 0,
    id: ""
  };


  ngOnInit(): void {
    this.isLoading = true;
    this._networkserv.getUserByUserId().subscribe((d) => {
      this.currentUserData = d;
      this.isLoading = false;
    })
  }

  fNameActive: boolean = true;
  lNameActive: boolean = true;
  emailActive: boolean = true;
  dobActive: boolean = true;
  genderActive: boolean = true;
  imageActive: boolean = true;

  currentUserImageId: string = "";
  updatedValue = "";

  reloadComponent() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentRoute);
    });
  }

  updateFName(fNameOld: string) {
    this.updatedValue = fNameOld;
    this.lNameActive = true;
    this.emailActive = true;
    this.dobActive = true;
    this.genderActive = true;
    this.fNameActive = false;
    this.imageActive = true;
  }

  updateFNameNew() {
    this.isLoading = true;
    this._networkserv.updateUser({ "firstName": this.updatedValue }).subscribe((d) => {
      this.isLoading = false;
      this.reloadComponent()
    })
  }

  updateLName(lNameOld: string) {
    this.updatedValue = lNameOld;
    this.lNameActive = false;
    this.emailActive = true;
    this.dobActive = true;
    this.genderActive = true;
    this.fNameActive = true;
    this.imageActive = true;
  }

  updateLNameNew() {
    this.isLoading = true;
    this._networkserv.updateUser({ "lastName": this.updatedValue }).subscribe((d) => {
      this.isLoading = false;
      this.reloadComponent()
    })
  }

  updateEmail(emailOld: string) {
    this.updatedValue = emailOld;
    this.lNameActive = true;
    this.emailActive = false;
    this.dobActive = true;
    this.genderActive = true;
    this.fNameActive = true;
    this.imageActive = true;
  }

  updateEmailNew() {
    this.isLoading = true;
    this._networkserv.updateUser({ "email": this.updatedValue }).subscribe((d) => {
      this.isLoading = false;
      this.reloadComponent()

    })
  }

  updateDob(dobOld: string) {
    this.updatedValue = dobOld;
    this.lNameActive = true;
    this.emailActive = true;
    this.dobActive = false;
    this.genderActive = true;
    this.fNameActive = true;
    this.imageActive = true;

  }

  updateDobNew() {
    this.isLoading = true;
    this._networkserv.updateUser({ "dob": this.updatedValue }).subscribe((d) => {
      this.isLoading = false;
      this.reloadComponent()

    })
  }

  updateGender(genderOld: string) {
    console.log('genderOld', genderOld)
    this.updatedValue = genderOld;
    this.lNameActive = true;
    this.emailActive = true;
    this.dobActive = true;
    this.genderActive = false;
    this.fNameActive = true;
    this.imageActive = true;
  }

  updateGenderNew() {
    this.isLoading = true;
    this._networkserv.updateUser({ "gender": this.updatedValue }).subscribe((d) => {
      this.isLoading = false;
      this.reloadComponent()

    })
  }


  //Settings for password change
  updatepassform: updatePassForm = {
    "password": ""
  }
  obj: any = {
    "confirmpassword": ""
  }

  updatePasswordSubmit() {
    console.log("button is clicked")
    this.isLoading = true;
    this._callapi.updateUserPassword(this.updatepassform).subscribe((d: any) => {
      if (d) {
        console.log('User password has been changed');

        this.isLoading = false;
        this.router.navigateByUrl('login');
      }
      else {
        console.log('User password has not been changed');
        this.isLoading = false;
        this.router.navigateByUrl('login');
      }

    })
  }

  onImageChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('picture', file);
      this._postserv.uploadImage(formData).subscribe((d) => {
        console.log('Response from upload image', d);
        this.currentUserImageId = d.uploadId;
        console.log('current user image id', this.currentUserImageId);
        // this.data.postImageId = this.postImageId;
      })
    }
  }

  updateProfileImage(imageIdOld:string){
    this.lNameActive = true;
    this.emailActive = true;
    this.dobActive = true;
    this.genderActive = true;
    this.fNameActive = true;
    this.imageActive = false;
  }

  updateImageNew() {
    this.isLoading = true;
    this._networkserv.updateUser({ "photoId": this.currentUserImageId }).subscribe((d) => {
      this.isLoading = false;
      this.reloadComponent()

    })
  }
  

}
