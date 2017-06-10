import { Component, OnInit } from '@angular/core';

import {PostService} from './../services/post.service';

import {Post} from './../Post';

@Component({
    selector: 'member-home',
    templateUrl: './home.component.html',
    styleUrls: ['./../member.component.css', './home.component.css']
})
export class HomeComponent implements OnInit{
    
    name: string;
    followedPosts: Post[];
    messageCount: number;

    postContent: string;

    constructor(
        private postService: PostService) {}

    ngOnInit(): void {
        this._updateFollowedPosts();
    }

    addPost(): void{
        this.postService.putPublicPost(this.postContent)
        .then(function(){
            return this._updateFollowedPosts()
        }.bind(this))
        .then(function(){
            this.postContent = "";
        }.bind(this))
    }

    _updateFollowedPosts(): Promise<Post[]>{
        return  this.postService.getFollowedPosts()
                .then(function(followedPosts: Post[]){
                    this.followedPosts=followedPosts;
                }.bind(this));
    }    
}