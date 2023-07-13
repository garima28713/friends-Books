import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallapiService } from 'src/app/services/callapi.service';
import { NetworkService } from 'src/app/services/network.service';
import { PostsService } from 'src/app/services/posts.service';
import { getAllFriendReqRespModel } from 'src/models/getAllFriendReqResponseModel';
import { getAllUserRespModel } from 'src/models/getAllUsersResponseModel';
import { updatePassForm } from 'src/models/updatePassModel';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit{
  friends = ['friend1','friend2','friend3','friend4']
  allUsersData: getAllUserRespModel[] = [];
  friendRequestSent = false;
  allFriendReqData: getAllFriendReqRespModel[] = [];
  allFriendsCount:number = 0;
  totalPostCount: number = 0;

  isLoading:boolean = false;


  currentUserFirstName:string = "";
  currentUserLastName:string = "";
  currentUserPhotoId:string = "";
  currentUserImageUrl: string = "";

  constructor(private _networserv: NetworkService, private _postservice: PostsService,private _callapi: CallapiService,  private router: Router, private _networkserv: NetworkService){}

  ngOnInit(): void {
    this.isLoading = true;
    this._networkserv.getUserByUserId().subscribe((d)=>{
      this.currentUserFirstName =  d.firstName;
      this.currentUserLastName = d.lastName;
      this.currentUserPhotoId = d.photoId;
      this.imageDownloadCurrentUser(this.currentUserPhotoId);
    })


    this._networserv.getAllUsers().subscribe((d)=>{
      this.isLoading = true;
      console.log('All registered users are ', d);
      this.allUsersData = d;
      this.isLoading = false;

    })

    const currentuser = localStorage.getItem('currentuser');
    this._networserv.getAllFriendRequests().subscribe((d)=>{
      
      this.allFriendReqData = d.filter(req => (req.friendId===currentuser && req.status==='Request Pending'));
      this.allFriendsCount = d.filter(req => ((req.friendId===currentuser || req.userId===currentuser) && req.status==='You are friend')).length;

    })

    this._postservice.findPostByUserId().subscribe((d) => {
      this.totalPostCount = d.length;
      this.isLoading = false;

    })



  }


  reloadComponent() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentRoute);
    });
  }

  sendFriendRequest(friendId:string){
    this.isLoading = true;
    this._networserv.makeFriendRequest(friendId).subscribe((d)=>{
      this.friendRequestSent = true;
      this.reloadComponent();
      this.isLoading = false;

    })
  }

  acceptFriendRequest(friendReqId:string, userId:string){
    this.isLoading = true;
    this._networserv.acceptFriendRequest(friendReqId,userId).subscribe((d)=>{
      this.friendRequestSent = true;
      this.reloadComponent()
      this.isLoading = false;

    })


    /* this._networserv.getAllUsers().subscribe((d)=>{
      console.log('All registered users are ', d);
      this.allUsersData = d;
    })

    const currentuser = localStorage.getItem('currentuser');
    this._networserv.getAllFriendRequests().subscribe((d)=>{
      
      this.allFriendReqData = d.filter(req => (req.friendId===currentuser && req.status==='Request Pending'));
      console.log('All Friend Requests are ', this.allFriendReqData);
    }) */
  }


  imageDownloadCurrentUser(postImageId: string) {
    if (postImageId) {
      this._postservice.getImage(postImageId).subscribe((d) => {
        this.currentUserImageUrl = URL.createObjectURL(d);
      
      })
    }
  }



}
