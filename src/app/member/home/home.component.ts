import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute,Params} from '@angular/router';

// import {MemberComponent} from '../member.component';

import {PostService} from './../services/post.service';
// import {PostService} from './../services/mock_post.service';

import {Post} from './../Post';


@Component({
    selector: 'member-home',
    inputs: ['username'],
    templateUrl: './home.component.html',
    styleUrls: ['./../member.component.css', './home.component.css'],
})
export class HomeComponent implements OnInit{

    public username: string;

    followedPosts: Post[];
    messageCount: number;

    postFormVisible: boolean = true;

    constructor(
        private postService: PostService) {}

    ngOnInit(): void {
        this._updateFollowedPosts();
        console.log('home', this.username)
    }

    addPost(postContent: string): void{
        

        this.postService.addPost(this.username, postContent)
        .then(function(){
            console.log('add post comp', this.username, postContent);
            return this._updateFollowedPosts();
        }.bind(this))
    }

    _updateFollowedPosts(): Promise<Post[]>{
        return  this.postService.getFollowedPosts(this.username)
                .then(function(followedPosts: Post[]){
                    console.log('update', followedPosts);
                    this.followedPosts=followedPosts;
                }.bind(this));
    }    
}