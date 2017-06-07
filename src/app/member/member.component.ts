import { Component, OnInit } from '@angular/core';
import { Router, Event } from '@angular/router';

import {AuthService} from './../services/auth.service'
import {MessageService} from './services/message.service';


@Component({
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']  
})
export class MemberComponent implements OnInit{ 
  messageCount: number;
  searchPattern: string = '';

  constructor(
      private authService: AuthService,
      private router: Router,
      private messageService: MessageService) {}

  _setMessageCount(): Promise<any>{
    return  this.messageService.getMessageCount()
            .then(function(messageCount: number){
              this.messageCount=messageCount;
            }.bind(this));
  }

  search(): void{
    this.router.navigate(['member/search', this.searchPattern]);
  }

  signout(): void{
    this.authService.signout()
    .then(function(signedOut: Promise<any>){
      this.router.navigate(['/sign-in']);
    }.bind(this))
  }

  ngOnInit(): void{

    this.authService.checkLogin()
    .then(this._setMessageCount.bind(this));

    this.router.events.subscribe(function(event: Event){
      if(event.constructor.name === 'NavigationStart'){
        this.authService.checkLogin()
        .then(function(isValid: boolean){
          if(isValid){
            this._setMessageCount();
          }else{
            this.router.navigate(['/signIn']);
          }
        }.bind(this));
      }
    }.bind(this))
  }
}
