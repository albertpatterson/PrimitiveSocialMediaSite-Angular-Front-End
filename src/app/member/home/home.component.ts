import { Component, OnInit, EventEmitter } from '@angular/core';

import {Router, ActivatedRoute,Params} from '@angular/router';

import {PostService} from './../services/post.service';
// import {PostService} from './../services/mock_post.service';

import {Post} from './../Post';


/**
 * Component showing the member's home page, allowing the to 
 * view followed posts and add new ones
 * 
 * @export
 * @class HomeComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'member-home',
    inputs: ['username'],
    outputs: ['userSelect'],
    templateUrl: './home.component.html',
    styleUrls: ['./../member.component.css', './home.component.css'],
})
export class HomeComponent implements OnInit{

    /**
     * the name of the user
     * 
     * @type {string}
     * @memberof HomeComponent
     */
    public username: string;

    /**
     * event to be emitted when a user is selected from the followed posts
     * 
     * @type {EventEmitter<string>}
     * @memberof HomeComponent
     */
    public userSelect: EventEmitter<string> = new EventEmitter();

    private followedPosts: Post[];
    private messageCount: number;
    private postFormVisible: boolean = true;

    /**
     * Creates an instance of HomeComponent.
     * @param {PostService} postService 
     * @memberof HomeComponent
     */
    constructor(
        private postService: PostService
        ) {}

    /**
     * update the list of followed posts on init
     * 
     * @memberof HomeComponent
     */
    ngOnInit(): void {
        this._updateFollowedPosts();
        console.log('home', this.username)
    }

    /**
     * add a new post
     * 
     * @param {string} postContent 
     * @memberof HomeComponent
     */
    addPost(postContent: string): void{
        
        this.postService.addPost(this.username, postContent)
        .then(function(){
            console.log('add post comp', this.username, postContent);
            return this._updateFollowedPosts();
        }.bind(this))
    }

    /**
     * update the list of followed posts
     * 
     * @returns {Promise<Post[]>} 
     * @memberof HomeComponent
     */
    _updateFollowedPosts(): Promise<Post[]>{
        return  this.postService.getFollowedPosts(this.username)
                .then(function(followedPosts: Post[]){
                    console.log('update', followedPosts);
                    this.followedPosts=followedPosts;
                }.bind(this));
    }

    /**
     * select a user from the list of posts and emit the userSelect event
     * 
     * @param {string} otherUsername 
     * @memberof HomeComponent
     */
    selectUser(selectedUserName: string){
        this.userSelect.next(selectedUserName);
    }    
}