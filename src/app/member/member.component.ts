import { Component, OnInit } from '@angular/core';
import { Router, Event, ActivatedRoute, Params } from '@angular/router';

import {AuthService} from './../services/auth.service'
import {MessageService} from './services/message.service';


@Component({
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']  
})
export class MemberComponent implements OnInit{ 
  username: string;
  messageCount: number;
  searchPattern: string = '';

  constructor(
      private authService: AuthService,
      private router: Router,
      private messageService: MessageService,
      private activatedRoute: ActivatedRoute) {}

  _setMessageCount(): Promise<any>{
    return  this.messageService.getMessageCount()
            .then(function(messageCount: number){
              this.messageCount=messageCount;
            }.bind(this));
  }

  search(): void{
    this.router.navigate(['member', this.username, 'search', this.searchPattern]);
  }

  signout(): void{
    this.authService.signout()
    .then(function(signedOut: Promise<any>){
      this.router.navigate(['/sign-in']);
    }.bind(this))
  }

  ngOnInit(): void{

      this.activatedRoute.params 
      .subscribe(function(params: Params){

        console.log(params)
        // get the username
        this.username = params["ownName"];
        console.log('username', this.username)

          // verify login
          this.authService.assertLoggedIn(this.username)
          .then(this._setMessageCount.bind(this))
          .catch((e:Error) => console.log(e));
      }.bind(this))   
  }
}
