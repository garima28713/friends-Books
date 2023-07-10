import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
import { PostsService } from 'src/app/services/posts.service';
import { getAllFriendReqRespModel } from 'src/models/getAllFriendReqResponseModel';
import { getAllUserRespModel } from 'src/models/getAllUsersResponseModel';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  currentuser = localStorage.getItem('currentuser');

  currentUserFirstName: string = "";
  currentUserLastName: string = "";
  currentUserPhotoId: string = "";
  currentUserImageUrl: string = "";

  allFriendsCount: number = 0;
  totalPostCount: number = 0;

  isLoading:boolean = false;

  constructor(private _networserv: NetworkService, private _networkserv: NetworkService, private _postservice: PostsService, private router: Router) { }

  allUsersData: getAllUserRespModel[] = [];
  friends = ['friend1', 'friend2', 'friend3', 'friend4']


  ngOnInit(): void {
    this.isLoading = true;
    const currentuser = localStorage.getItem('currentuser');


    this._networkserv.getUserByUserId().subscribe((d) => {
      this.currentUserFirstName = d.firstName;
      this.currentUserLastName = d.lastName;
      this.currentUserPhotoId = d.photoId;
      this.imageDownloadCurrentUser(this.currentUserPhotoId);
    })

    this._networserv.getAllUsers().subscribe((d) => {
      this.allUsersData = d;
      console.log('All users response', this.allUsersData)
    })

    this._networserv.getAllFriendRequests().subscribe((d) => {
      this.allFriendsCount = d.filter(req => ((req.friendId === currentuser || req.userId === currentuser) && req.status === 'You are friend')).length;

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

  blockUnblockUser(user: getAllUserRespModel) {
    if (user.isActive) {
      console.log('To block user: ', user);
      this.isLoading = true;
      this._networkserv.blockUnblockUser(user._id, { 'isActive': false }).subscribe((d) => {
        console.log("Response after blocking user", d);
        console.log('User ', user.firstName, ' has been blocked')
        this.reloadComponent();
        this.isLoading = false;
      })
    }
    else if (user.isActive === false) {
      this.isLoading = true;
      this._networkserv.blockUnblockUser(user._id, { 'isActive': true }).subscribe((d) => {
        console.log("Response after unblocking user", d);
        console.log('User ', user.firstName, ' has been unblocked')
        this.reloadComponent()
        this.isLoading = false;

      })
    }
  }

  makeRemoveAdmin(user: getAllUserRespModel) {
    if (user.isAdmin) {
      console.log('To remove user as Admin: ', user);
      this.isLoading = true;
      this._networkserv.makeRemoveAdmin(user._id, { 'isAdmin': false }).subscribe((d) => {
        console.log("Response after removing user as Admin", d);
        console.log('User ', user.firstName, ' has been removed as Admin')
        this.reloadComponent()
        this.isLoading = false;
      })
    }
    else if (user.isAdmin === false) {
      this.isLoading = true;
      this._networkserv.makeRemoveAdmin(user._id, { 'isAdmin': true }).subscribe((d) => {
        console.log("Response after making user as Admin", d);
        console.log('User ', user.firstName, ' has been added as Admin')
        this.reloadComponent()
        this.isLoading = false;
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
