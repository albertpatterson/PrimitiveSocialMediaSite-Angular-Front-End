import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PersonalDataService } from './../services/personal-data.service';
import { PostService } from '../services/post.service';
import { MessageService } from './../services/message.service';
import { SubscriptionService } from './../services/subscription.service';

import { User } from '../User';
import { Post } from '../Post';


/**
 * Component that displays a user's profile
 * 
 * @export
 * @class ProfileComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'member-profile',
    inputs: ['username', 'profileUsername'],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

    /**
     * the username of the currently signed in user
     * 
     * @public
     * @type {string}
     * @memberof ProfileComponent
     */
    public username: string;
    
    /**
     * the username of the user whose profile should be shown
     * 
     * @public
     * @type {string}
     * @memberof ProfileComponent
     */
    public profileUsername: string;
    
    /**
     * personal data of the profiled user
     * 
     * @public
     * @type {User}
     * @memberof ProfileComponent
     */
    public profileUserData: User;   


    /**
     * posts of the profiled user
     * 
     * @public
     * @type {Post[]}
     * @memberof ProfileComponent
     */
    public profilePosts: Post[];     

    /**
     * Creates an instance of ProfileComponent.
     * @param {PersonalDataService} personalDataService 
     * @param {PostService} postService 
     * @param {MessageService} messageService 
     * @param {SubscriptionService} subscriptionService 
     * @memberof ProfileComponent
     */
    constructor(
        private personalDataService: PersonalDataService,
        private postService: PostService,
        private messageService: MessageService,
        private subscriptionService: SubscriptionService
        ){}

    /**
     * get the personal data and posts of the profiled user in init
     * 
     * @memberof ProfileComponent
     */
    ngOnInit(): void{
        console.log('otherName', this.profileUsername)
        this.personalDataService.getUserData(this.username, this.profileUsername)
        .then(function(profileUserData: User){
                this.profileUserData = profileUserData;
                this.postService.getOwnPosts(this.username, this.profileUsername)
                .then(function(profilePosts: Post[]){
                    this.profilePosts = profilePosts;
                }.bind(this))
        }.bind(this))   
    }

    /**
     * send a message to the profiled user
     * 
     * @param {string} message - the content of the message to send
     * @memberof ProfileComponent
     */
    public sendMessage(message: string): void {
        alert(message);
        this.messageService.addMessage(this.username, message, this.profileUsername)
        .then(()=>alert("Message Sent!"))
    }


    /**
     * subscribe to posts by this user
     * 
     * @public
     * @memberof ProfileComponent
     */
    public subscribe(): void {
        this.subscriptionService.addSubscription(this.username, this.profileUsername)
        .then(()=>alert("Subscribed!"))
    }
}