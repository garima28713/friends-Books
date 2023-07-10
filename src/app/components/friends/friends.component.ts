import { StickyDirection } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { PostsService } from 'src/app/services/posts.service';
import { getAllFriendReqRespModel } from 'src/models/getAllFriendReqResponseModel';
import { getuserbyuseridresp } from 'src/models/getUserByUseridModel';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  currentuser = localStorage.getItem('currentuser');

  currentUserFirstName: string = "";
  currentUserLastName: string = "";
  currentUserPhotoId: string = "";
  currentUserImageUrl: string = "";

  allFriendsCount: number = 0;
  totalPostCount: number = 0;

  postImageUrlArray: Array<string> = [];

  isLoading:boolean = false;


  constructor(private _networserv: NetworkService, private _networkserv: NetworkService, private _postservice: PostsService) { }

  allFriendsData: getAllFriendReqRespModel[] = [];
  allFriendsUserData: getuserbyuseridresp[] = [];
  // friends = ['friend1', 'friend2', 'friend3', 'friend4']


  ngOnInit(): void {
    this.isLoading = true;
    this._networkserv.getUserByUserId().subscribe((d) => {
      this.currentUserFirstName = d.firstName;
      this.currentUserLastName = d.lastName;
      this.currentUserPhotoId = d.photoId;
      this.imageDownloadCurrentUser(this.currentUserPhotoId);
    })


    const currentuser = localStorage.getItem('currentuser');
    this._networserv.getAllFriendRequests().subscribe((d) => {

      this.allFriendsCount = d.filter(req => ((req.friendId === currentuser || req.userId === currentuser) && req.status === 'You are friend')).length;

      d.filter(req => ((req.friendId === currentuser || req.userId === currentuser) && req.status === 'You are friend')).forEach((friend) => {
        this._networserv.getUserByAnyUserId(friend.userId === currentuser ? friend.friendId : friend.userId).subscribe((w) => {
          this.allFriendsUserData.push(w);
          this.imageDownload(w.photoId);

          console.log('operation successfull')
        })
      });
      console.log('All Friend Requests are ', this.allFriendsData);
      console.log('All Friend Requests are ', this.allFriendsUserData);
    })

    this._postservice.findPostByUserId().subscribe((d) => {
      this.totalPostCount = d.length;
      this.isLoading = false;

    })

  }

  getUserNameFromUserId(friendUserId: string) {
    console.log('friends id is  ', friendUserId)
    this._networserv.getUserByAnyUserId(friendUserId).subscribe((d) => {
      console.log('Friends name are', d.firstName + ' ' + d.lastName)
    })
  }

  postImageURL: string = "";
  imageDownload(postImageId: string) {
    console.log('Image download is called for post ', postImageId);
    if (postImageId) {
      this._postservice.getImage(postImageId).subscribe((d) => {
        this.postImageURL = URL.createObjectURL(d);
        console.log('post image url for post ', this.postImageURL);
        this.postImageUrlArray.push(this.postImageURL)
      })
    }
  }

  imageDownloadCurrentUser(postImageId: string) {
    // console.log('Image download is called', postImageId);
    if (postImageId) {
      this._postservice.getImage(postImageId).subscribe((d) => {
        this.currentUserImageUrl = URL.createObjectURL(d);

      })
    }
  }

}
