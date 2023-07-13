import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { createPostRequest } from 'src/models/createPostRequestModel';
import { findAllPostsByUserIdResponse } from 'src/models/findAllPostsByUserIdModel';
import { findAllPostsByUserIdResponseModified } from 'src/models/findAllPostsByUserIdModelModified';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NetworkService } from 'src/app/services/network.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading: boolean = false;
  createPostEnabled: boolean = false;
  updatePostEnabled: boolean = false;
  allPostsData: findAllPostsByUserIdResponse[] = [];
  // allPostsDataModified: findAllPostsByUserIdResponseModified[] = [];
  post: string = "";
  postId: string = "";
  postImageId: string = "";
  objectURL: string = "";
  allFriendsCount: number = 0;
  isAlertEnabled:boolean = false;
  alertContent: string = "";

  currentUserFirstName: string = "";
  currentUserLastName: string = "";
  currentUserPhotoId: string = "";
  currentUserImageUrl: string = "";

  postImageUrlArray: Array<string> = [];



  data: createPostRequest = {
    "post": "",
    "userId": "",
    "userName": "",
    "userPhotoId": this.currentUserPhotoId,
    "postImageId": "",
    "isActive": true,
    "isAdmin": false,
    "profession": "student"
  }

  constructor(private _postservice: PostsService, private sanitizer: DomSanitizer, private _networkserv: NetworkService, private router: Router) { }

  ngOnInit(): void {

    this.isLoading = true;

    this._networkserv.getUserByUserId().subscribe((d) => {
      this.currentUserFirstName = d.firstName;
      this.currentUserLastName = d.lastName;
      this.currentUserPhotoId = d.photoId;
      this.imageDownloadCurrentUser(this.currentUserPhotoId);
    })


    this._postservice.findPostByUserId().subscribe((d) => {
 
      this.allPostsData = d;
      for (let index = 0; index < d.length; index++) {
        const element = d[index];
       

        if(element.postImageId === ""){
          this.imageDownload('64a80c7fc1062f1510c4135e');
        }
        else{
          this.imageDownload(element.postImageId);
        }

      }
    })

    this._networkserv.getAllFriendRequests().subscribe((d) => {
      const currentuser = localStorage.getItem('currentuser');
      this.allFriendsCount = d.filter(req => ((req.friendId === currentuser || req.userId === currentuser) && req.status === 'You are friend')).length;
      this.isLoading = false;

    })
  }


  reloadComponent() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentRoute);
    });
  }

  createPostEnable() {
    this.createPostEnabled = !this.createPostEnabled;
  }

  submitPost() {
    this.isLoading = true;
    const userid = localStorage.getItem('currentuser');
    const username = localStorage.getItem('userName');
    if (userid !== null && username !== null) {
      this.data.userId = userid;
      this.data.userName = username;
    }
    this._postservice.createPost(this.data).subscribe((d) => {
      this.createPostEnabled = false;
      this.isAlertEnabled = true;
      this.alertContent = "Hurray! Your Post has been posted."
      
      this.isLoading = false;
      this.reloadComponent()
     /*  setTimeout(() => {
        this.isAlertEnabled = false;
        this.alertContent = "";
      }, 6000); */
    })
  }

  deletePost(postId: string) {
    this.isLoading = true;
    this._postservice.deletePost(postId).subscribe((d) => {
      this._postservice.findPostByUserId().subscribe((d) => {
        this.allPostsData = d;
        console.log('Response of All posts', this.allPostsData);
      })
      this.isLoading = false;
      this.reloadComponent()

    })
  }

  updatePost(postObject: findAllPostsByUserIdResponse) {
    this.postId = postObject._id;
    this.post = postObject.post;
    this.updatePostEnabled = true;
    this.createPostEnabled = true;
    this.data.post = this.post;



  }

  updatedPostSubmit() {
    this.isLoading = true;
    this._postservice.updatePost(this.postId, this.data.post).subscribe((d) => {
      this._postservice.findPostByUserId().subscribe((d) => {
        this.allPostsData = d;
        this.updatePostEnabled = false;
        this.createPostEnabled = false;
        this.data.post = "";
        this.data.userId = "";
        this.data.userName = "";
      })
      this.isLoading = false;
      this.reloadComponent()

    })
  }


  onImageChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('picture', file);
      this._postservice.uploadImage(formData).subscribe((d) => {
        this.postImageId = d.uploadId;
        this.data.postImageId = this.postImageId;
      })
    }
  }

  postImageURL: string = "";
  imageDownload(postImageId: string) {
    if (postImageId) {
      this._postservice.getImage(postImageId).subscribe((d) => {
        this.postImageURL = URL.createObjectURL(d);
        this.postImageUrlArray.push(this.postImageURL)
      })
    }
  }


  imageDownloadCurrentUser(postImageId: string) {
    if (postImageId) {
      this._postservice.getImage(postImageId).subscribe((d) => {
        this.currentUserImageUrl = URL.createObjectURL(d);

      })
    }
  }

  onload(post: findAllPostsByUserIdResponse) {

    this.imageDownload(post.postImageId);
  }


}
