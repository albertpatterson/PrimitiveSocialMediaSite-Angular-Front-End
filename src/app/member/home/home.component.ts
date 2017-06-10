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

    postFormVisible: boolean = true;

    constructor(
        private postService: PostService) {}

    ngOnInit(): void {
        this._updateFollowedPosts();
    }

    addPost(postContent: string): void{
        alert(postContent)
        this.postService.putPublicPost(postContent)
        .then(function(){
            return this._updateFollowedPosts()
        }.bind(this))
    }

    _updateFollowedPosts(): Promise<Post[]>{
        return  this.postService.getFollowedPosts()
                .then(function(followedPosts: Post[]){
                    this.followedPosts=followedPosts;
                }.bind(this));
    }    
}