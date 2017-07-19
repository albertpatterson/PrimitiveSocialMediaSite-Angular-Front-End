import { Component, OnInit } from '@angular/core';
import { Router, Event, ActivatedRoute, Params } from '@angular/router';

import {AuthService} from './../services/auth.service'
// import { AuthService } from './../services/mock_auth.service';
import {MessageService} from './services/message.service';
// import {MessageService} from './services/mock_message.service';


/**
 * Component implementing the member area, including the following 
 * pages: home, messages, search, premium, profile
 * 
 * @export
 * @class MemberComponent
 * @implements {OnInit}
 */
@Component({
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']  
})
export class MemberComponent implements OnInit{ 
    
  // the current user's username
  username: string;
  // the number of messages available
  messageCount: number;
  // currently displayed page 
  currentPage: string = "home";
  
  // data required by the search component
  searchComponentData = {
                          searchPattern: ''
                        };

  // data required by the other user component
  profileComponentData = {
                              profileUsername: ''
                            };

  constructor(
      private authService: AuthService,
      private router: Router,
      private messageService: MessageService,
      private activatedRoute: ActivatedRoute
      ) {}

  /**
   * update the count of the number of messages available
   * 
   * @returns {Promise<any>} 
   * @memberof MemberComponent
   */
  _setMessageCount(): Promise<any>{
    console.log('get message count');
    return  this.messageService.getMessageCount(this.username)
            .then(function(messageCount: number){
              console.log('message count', messageCount)
              this.messageCount=messageCount;
            }.bind(this));
  }

  /**
   * go to a particlar view/page in the member area
   * 
   * @param {string} page - the page in the member area to display 
   * @memberof MemberComponent
   */
  go(page: string): void{
    this.authService.assertLoggedIn(this.username)
      .then(this._setMessageCount.bind(this))
      .catch((e:Error) => console.log(e));

    this.currentPage = page;
  }

  /**
   * perform a search for other users
   * 
   * @param {string} searchPattern - the search pattern to match
   * @memberof MemberComponent
   */
  search(searchPattern: string): void {
    console.log('search searchPattern', searchPattern)
    this.searchComponentData.searchPattern = searchPattern;
    this.go('search');
  }

  /**
   * go to a users profile
   * 
   * @param {string} profileUsername - the username of the user whose profile
   *    should be shown
   * @memberof MemberComponent
   */
  goProfile(profileUsername: string){
    console.log('visit other!', profileUsername)
    this.profileComponentData.profileUsername = profileUsername;
    this.go("other");
  }

  /**
   * sign out of the member area
   * 
   * @memberof MemberComponent
   */
  signout(): void{
    this.authService.signout(this.username)
    .then(function(signedOut: Promise<any>){
      this.router.navigate(['/sign-in']);
    }.bind(this))
  }

  /**
   * set the username, assert the user is logged in and then set
   * the message count on init
   * 
   * @memberof MemberComponent
   */
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
