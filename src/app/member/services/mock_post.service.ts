import { Injectable } from '@angular/core'
import { Post } from './../Post';

import {mockUserData, addPost, getOwnPosts} from '../../mockData/mockUserData';

@Injectable()
export class PostService{
    getFollowedPosts(username: string): Promise<Post[]> {
        // return Promise.resolve(mockPosts);
        return new Promise(function(res: Function, rej: Function){
            console.log("mud", mockUserData[username]);

            let followedPosts: Post[] = getOwnPosts(username);
            let following = mockUserData[username].following;
            console.log('following', following);
            following.forEach((othersname:string)=>{
                console.log('following ', othersname);
                let othersPosts = getOwnPosts(othersname);
                console.log('othersPosts', othersPosts);
                followedPosts.push(...othersPosts);
            })
            console.log('followedPosts', followedPosts);
            res(followedPosts);
        });
    }

    getOwnPosts(username: string): Promise<Post[]>{
        return new Promise(function(res: Function, rej: Function){
            res(getOwnPosts(username));
        });
    }

    putPublicPost(username: string, content: string): Promise<{}>{
        return new Promise((res:Function)=>{
            addPost(username, content);
            res();
        });
    }

    putPrivatePost(username: string, content: string, recipient: string): Promise<{}>{
        return new Promise((res:Function)=>{
            mockUserData[recipient].messages.push({poster: username, content});
            res();
        });
    }
}