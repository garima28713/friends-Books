import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLs } from '../../configuration/config'
import { getAllUserRespModel } from 'src/models/getAllUsersResponseModel';
import { getAllFriendReqRespModel } from 'src/models/getAllFriendReqResponseModel';
import { getuserbyuseridresp } from 'src/models/getUserByUseridModel';


@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http: HttpClient) { }

  getAllUsersUrl: string = "";
  createFriendRequestUrl: string = "";
  getAllFriendReqUrl: string = "";
  acceptFriendRequestUrl: string = "";
  getUserByUserIdUrl: string = "";
  updateUserUrl: string = "";
  allFriendsCount: number = 0;


  getAllUsers() {
    this.getAllUsersUrl = URLs.getAllUsers;
    console.log("calling this endpoint ", this.getAllUsersUrl)
    return this.http.get<getAllUserRespModel[]>(this.getAllUsersUrl);
  }

  makeFriendRequest(friendId: string) {
    this.createFriendRequestUrl = URLs.createFriendRequest;
    console.log("calling this endpoint ", this.createFriendRequestUrl);
    const userId = localStorage.getItem('currentuser');
    const requestPayload = { 'userId': userId, 'friendId': friendId, 'status': 'Request Pending' }
    console.log("Request payload", requestPayload)
    return this.http.post(this.createFriendRequestUrl, requestPayload);
  }

  getAllFriendRequests() {
    this.getAllFriendReqUrl = URLs.getAllFriendRequests;
    console.log("calling this endpoint ", this.getAllFriendReqUrl)
    return this.http.get<getAllFriendReqRespModel[]>(this.getAllFriendReqUrl);
  }

  acceptFriendRequest(friendReqId: string, userId: string) {
    this.acceptFriendRequestUrl = URLs.acceptFriendRequest;
    console.log("calling this endpoint ", this.acceptFriendRequestUrl + friendReqId);
    const friendId = localStorage.getItem('currentuser');
    const requestPayload = { 'userId': userId, 'friendId': friendId, 'status': 'You are friend' }
    console.log("Request payload", requestPayload)
    return this.http.put(this.acceptFriendRequestUrl + friendReqId, requestPayload);
  }

  getUserByUserId() {
    const currentuser = localStorage.getItem('currentuser');
    this.getUserByUserIdUrl = URLs.getUserByUserId;
    console.log("calling this endpoint ", this.getUserByUserIdUrl + currentuser)
    return this.http.get<getuserbyuseridresp>(this.getUserByUserIdUrl + currentuser);
  }

  getUserByAnyUserId(userId: string) {
    this.getUserByUserIdUrl = URLs.getUserByUserId;
    console.log("calling this endpoint ", this.getUserByUserIdUrl + userId)
    return this.http.get<getuserbyuseridresp>(this.getUserByUserIdUrl + userId);
  }

  updateUser(reqPayload: any) {
    const currentuser = localStorage.getItem('currentuser');
    this.updateUserUrl = URLs.updateUser;
    console.log("calling this endpoint ", this.updateUserUrl + currentuser)
    return this.http.put(this.updateUserUrl + currentuser, reqPayload);
  }

  blockUnblockUser(userId: string, reqPayload: any) {
    // const currentuser = localStorage.getItem('currentuser');
    this.updateUserUrl = URLs.updateUser;
    console.log("calling this endpoint ", this.updateUserUrl + userId)
    return this.http.put(this.updateUserUrl + userId, reqPayload);
  }

  makeRemoveAdmin(userId: string, reqPayload: any) {
    // const currentuser = localStorage.getItem('currentuser');
    this.updateUserUrl = URLs.updateUser;
    console.log("calling this endpoint ", this.updateUserUrl + userId)
    return this.http.put(this.updateUserUrl + userId, reqPayload);
  }

  countTotalFriends() {
    const currentuser = localStorage.getItem('currentuser');
    this.getAllFriendRequests().subscribe((d) => {
      this.allFriendsCount =  d.filter(req => ((req.friendId === currentuser || req.userId === currentuser) && req.status === 'You are friend')).length;
    
    })
    return this.allFriendsCount;
  }

  countTotalPosts() {

  }
}
