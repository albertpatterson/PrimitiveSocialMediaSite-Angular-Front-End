import { Component, OnInit } from '@angular/core';
import { Router, Event, ActivatedRoute, Params } from '@angular/router';

import {AuthService} from './../services/auth.service'
// import { AuthService } from './../services/mock_auth.service';
import {MessageService} from './services/message.service';
// import {MessageService} from './services/mock_message.service';


@Component({
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']  
})
export class MemberComponent implements OnInit{ 
    
  username: string;
  messageCount: number;
  searchPattern: string = '';
  othersName: string;

  view: string = "home";

  constructor(
      private authService: AuthService,
      private router: Router,
      private messageService: MessageService,
      private activatedRoute: ActivatedRoute) {}

  _setMessageCount(): Promise<any>{
    console.log('get message count');
    return  this.messageService.getMessageCount(this.username)
            .then(function(messageCount: number){
              console.log('message count', messageCount)
              this.messageCount=messageCount;
            }.bind(this));
  }

  go(view: string): void{
    this.authService.assertLoggedIn(this.username)
      .then(this._setMessageCount.bind(this))
      .catch((e:Error) => console.log(e));

    this.view = view;
  }

  search(searchPattern: string): void {
    console.log('search searchPattern', searchPattern)
    this.searchPattern = searchPattern;
    this.go('search');
  }

  searchOnEnter(event: any): void{
    if(event.key==="Enter"){
      this.search(event.target.value);
    }
  }

  visitUser(othersName: string){
    console.log('visit other!', othersName)
    this.view = "other";
    this.othersName = othersName;
  }

  signout(): void{
    this.authService.signout(this.username)
    .then(function(signedOut: Promise<any>){
      this.router.navigate(['/sign-in']);
    }.bind(this))
  }

  ngOnInit(): void{

      this.activatedRoute.params 
      .subscribe(function(params: Params){

        console.log(params)
        // get the username
        this.username = params["ownName"];;
        console.log('username', this.username)

          // verify login
          this.authService.assertLoggedIn(this.username)
          .then(this._setMessageCount.bind(this))
          .catch((e:Error) => console.log(e));
      }.bind(this))   
  }
}
