import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { SearchService } from '../services/search.service';
import { PostService } from '../services/post.service';

import { User } from '../User';
import { Post } from '../Post';

@Component({
    selector: 'member-other',
    templateUrl: './other.component.html',
    styleUrls: ['./../member.component.css', './other.component.css']
})
export class OtherComponent implements OnInit{

    user: User;   
    ownPosts: Post[];     

    constructor(
        private searchService: SearchService,
        private postService: PostService,
        private activatedRoute: ActivatedRoute){}

    ngOnInit(): void{
       this.activatedRoute.params 
        .switchMap(function(params: Params){
            return this.searchService.search(`^${params["name"]}$`);     
        }.bind(this))
        .subscribe(function(users: User[]){
            if(users.length===1){
                this.user = users[0];
                this.postService.getOwnPosts(this.user.name)
                .then(function(ownPosts: Post[]){
                    this.ownPosts = ownPosts;
                }.bind(this))
            }else{
                //handle error
                console.log('multiple matches')
            }
        }.bind(this))   
    }

    sendMessage(message: string): void {
        alert(message);
        this.postService.putPrivatePost(message)
        .then(function(){
            alert("Message Sent!");
        }.bind(this))
    }
}