import { Injectable } from '@angular/core'
import {Http, Response, URLSearchParams} from '@angular/http';

import { Post } from './../Post';

import {assertStatus, handleError} from '../../utils/handleResponse';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PostService{

    private _postUrl: string = "/post";

    constructor(
        private http: Http
    ){}

    getFollowedPosts(username: string): Promise<Post[]> {
        return this._getPosts(username, username, "followed");
    }

    getOwnPosts(username: string, poster: string): Promise<Post[]>{
        return this._getPosts(username, poster, "own");
    }

    private _getPosts(username: string, poster: string, type: string): Promise<Post[]>{

        return new Promise((res: Function, rej: Function)=>{
            let data = new URLSearchParams();
            data.append('username', username);
            data.append('poster', poster);
            data.append('type', type);

            let resolver = (resp: Response)=>res(resp.json().data);

            this.http.get(this._postUrl, {search: data})
            .toPromise()
            .then((resp: Response)=>assertStatus(resolver, resp, 200, "Could not get posts."))
            .catch((err: any)=>handleError(rej, err))
        });
    }

    // }

    addPost(username: string, content: string): Promise<{}>{

        console.log('add post', username, content)

        return new Promise((res: Function, rej: Function)=>{
                    let data = new URLSearchParams();
                    data.append('username', username);
                    data.append('content', content);

                    this.http.post(this._postUrl, data)
                    .toPromise()
                    .then((resp: Response)=>assertStatus(res, resp, 201, "Could not add post."))
                    .catch((err: any)=>handleError(rej, err))
                });    
    }

    deletePost(username: string, idx: number): Promise<{}>{
        return new Promise((res: Function, rej: Function)=>{
            let data = new URLSearchParams();
            data.append('username', username);
            data.append('index', idx.toString());

            this.http.delete(this._postUrl, {search: data})
            .toPromise()
            .then((resp: Response)=>assertStatus(res, resp, 204, "Could not delete post."))
            .catch((err: any)=>handleError(rej, err))
        });    
    }
}