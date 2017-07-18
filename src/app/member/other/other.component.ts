import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// import { SearchService } from '../services/search.service';
// import { SearchService } from '../services/mock_search.service';
import {PersonalDataService} from './../services/personal-data.service';

import { PostService } from '../services/post.service';
// import {PostService} from './../services/mock_post.service';

import {MessageService} from './../services/message.service';
// import {MessageService} from './../services/mock_message.service';

import {SubscriptionService} from './../services/subscription.service';


import { User } from '../User';
import { Post } from '../Post';

@Component({
    selector: 'member-other',
    inputs: ['username', 'profileUsername'],
    templateUrl: './other.component.html',
    styleUrls: ['./../member.component.css', './other.component.css']
})
export class OtherComponent implements OnInit{

    public username: string;
    public profileUsername: string;
    
    user: User;   
    ownPosts: Post[];     

    constructor(
        private personalDataService: PersonalDataService,
        private postService: PostService,
        private messageService: MessageService,
        private subscriptionService: SubscriptionService){}

    ngOnInit(): void{
    //    this.activatedRoute.params 
    //     .switchMap(function(params: Params){
    //         return this.searchService.search(`^${params["othersName"]}$`);     
    //     }.bind(this))

        console.log('otherName', this.profileUsername)
        this.personalDataService.getUserData(this.username, this.profileUsername)
        .then(function(user: User){
                this.user = user;
                this.postService.getOwnPosts(this.username, this.user.name)
                .then(function(ownPosts: Post[]){
                    this.ownPosts = ownPosts;
                }.bind(this))
        }.bind(this))   
    }

    sendMessage(message: string): void {
        alert(message);
        this.messageService.addMessage(this.username, message, this.profileUsername)
        .then(()=>alert("Message Sent!"))
    }

    subscribe(): void {
        this.subscriptionService.addSubscription(this.username, this.user.name)
        .then(()=>alert("Subscribed!"))
    }
}