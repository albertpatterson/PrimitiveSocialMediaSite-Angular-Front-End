import { Component, OnInit } from '@angular/core';

import {PostService} from './../services/post.service';

import {Post} from './../Post';

@Component({
    selector: 'member-home',
    templateUrl: './home.component.html',
    styleUrls: ['./../member.component.css', './home.component.css']
})
export class HomeComponent implements OnInit{
    
    followedPosts: Post[];
    messageCount: number;

    constructor(
        private postService: PostService) {}

    ngOnInit(): void {
        this.postService.getPosts()
        .then(function(followedPosts: Post[]){
            this.followedPosts=followedPosts;
        }.bind(this));
    }
}