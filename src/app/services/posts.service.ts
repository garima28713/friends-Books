import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLs } from 'src/configuration/config';
import { createPostRequest } from 'src/models/createPostRequestModel';
import { findAllPostsByUserIdResponse } from 'src/models/findAllPostsByUserIdModel';
import { uploadImageResp } from 'src/models/uploadImageRespModel';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  findPostsbyUseridUrl:string = "";
  createPostUrl:string = "";
  deletePostUrl:string = "";
  updatePostUrl:string = "";
  uploadImageUrl:string = "";
  getImageUrl:string = "";


  createPost(createPostRequestPayload:createPostRequest){
    this.createPostUrl = URLs.createPost;
    console.log("calling this endpoint ", this.createPostUrl)
    console.log("Request payload", createPostRequestPayload)
    return this.http.post(this.createPostUrl, createPostRequestPayload);
  }

  findPostByUserId(){
    const userid = localStorage.getItem('currentuser');
    this.findPostsbyUseridUrl = URLs.findpostsbyuserid;
    console.log("calling this endpoint ", this.findPostsbyUseridUrl)
    const requestPayload = {id: userid};
    console.log("Request payload", requestPayload)
    return this.http.post<findAllPostsByUserIdResponse[]>(this.findPostsbyUseridUrl, requestPayload);
  }

  deletePost(postId:string){
    this.deletePostUrl = URLs.deletePost;
    console.log("calling this endpoint ", this.deletePostUrl + postId)
    return this.http.delete(this.deletePostUrl + postId);
  }

  updatePost(postId:string, post:string){
    this.updatePostUrl = URLs.updatePost;
    console.log("calling this endpoint ", this.updatePostUrl + postId)
    return this.http.put(this.updatePostUrl + postId,{"post":post});
  }

  uploadImage(formData: FormData){
    this.uploadImageUrl = URLs.uploadImage;
    console.log("calling this endpoint ", this.uploadImageUrl);
    console.log('request payload', formData);
    return this.http.post<uploadImageResp>(this.uploadImageUrl, formData);
  }

  getImage(photoId: string){
    this.getImageUrl = URLs.getImage;
    console.log("calling this endpoint ", this.getImageUrl+photoId);
    return this.http.get(this.getImageUrl+photoId, {responseType:'blob'});
  }


}
