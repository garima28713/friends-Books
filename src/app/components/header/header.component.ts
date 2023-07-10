import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { getAllFriendReqRespModel } from 'src/models/getAllFriendReqResponseModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentuserrole:any = "";

  constructor(private _networkserv: NetworkService) { 
    if(localStorage.getItem('role')!==null){
      this.currentuserrole = localStorage.getItem('role');
    }
    
  }

  allFriendReqData: getAllFriendReqRespModel[] = [];
  friendRequestCount:number = 0;


  ngOnInit(): void {
    const currentuser = localStorage.getItem('currentuser');
    this._networkserv.getAllFriendRequests().subscribe((d) => {

      this.friendRequestCount = d.filter(req => (req.friendId === currentuser && req.status === 'Request Pending')).length;
      console.log('All Friend Requests count is ', this.friendRequestCount);
    })
  }


}
