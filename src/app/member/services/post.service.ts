import { Injectable } from '@angular/core'
import {Http, Response, URLSearchParams} from '@angular/http';

import { Post } from './../Post';

import {assertStatus, handleError} from '../../utils/handleResponse';

import 'rxjs/add/operator/toPromise';

/**
 * Service providing a user access to posts
 * 
 * @export
 * @class PostService
 */
@Injectable()
export class PostService{

    /**
     * url of the post resource
     * 
     * @private
     * @type {string}
     * @memberof PostService
     */
    private _postUrl: string = document.location.origin+":9000/social-media/api/post";

    /**
     * Creates an instance of PostService.
     * @param {Http} http 
     * @memberof PostService
     */
    constructor(
        private http: Http
    ){}

    /**
     * get the posts followed by a user
     * 
     * @param {string} username 
     * @returns {Promise<Post[]>} 
     * @memberof PostService
     */
    getFollowedPosts(username: string): Promise<Post[]> {
        return this._getPosts(username, username, "followed");
    }

    /**
     * get the posts created by a user
     * 
     * @param {string} username 
     * @param {string} poster 
     * @returns {Promise<Post[]>} 
     * @memberof PostService
     */
    getOwnPosts(username: string, poster: string): Promise<Post[]>{
        return this._getPosts(username, poster, "own");
    }

    /**
     * get various types of posts
     * 
     * @private
     * @param {string} username 
     * @param {string} poster 
     * @param {string} type - the type of posts ("followed" or "own")
     * @returns {Promise<Post[]>} 
     * @memberof PostService
     */
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

    /**
     * add a new post
     * 
     * @param {string} username 
     * @param {string} content 
     * @returns {Promise<{}>} 
     * @memberof PostService
     */
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

    /**
     * delete a post
     * 
     * @param {string} username 
     * @param {number} idx - index of the post to delete
     * @returns {Promise<{}>} 
     * @memberof PostService
     */
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
