import { Injectable } from '@angular/core'
import {Http, Response, URLSearchParams} from '@angular/http';

import { Post } from './../Post';

import {assertStatus, handleError} from '../../utils/handleResponse';

import 'rxjs/add/operator/toPromise';

/**
 * Service providing a user to access to messages
 * 
 * @export
 * @class MessageService
 */
@Injectable()
export class MessageService{

    /**
     * url providing access to the message resource
     * 
     * @private
     * @type {string}
     * @memberof MessageService
     */
    private _messageUrl: string = "/message";

    /**
     * Creates an instance of MessageService.
     * @param {Http} http 
     * @memberof MessageService
     */
    constructor(
        private http: Http
    ){}

    /**
     * get the number of message available to a user
     * 
     * @param {string} username 
     * @returns {Promise<number>} 
     * @memberof MessageService
     */
    getMessageCount(username: string) :Promise<number>{
        return this.getMessages(username).then(ms => ms.length);
    }

    /**
     * get the messages available to a user
     * 
     * @param {string} username 
     * @returns {Promise<Post[]>} 
     * @memberof MessageService
     */
    getMessages(username: string): Promise<Post[]>{

        return new Promise((res: Function, rej: Function)=>{
            let data = new URLSearchParams();
            data.append('username', username);

            let resolver = (resp: Response)=>res(resp.json().data);

            this.http.get(this._messageUrl, {search: data})
            .toPromise()
            .then((resp: Response)=>assertStatus(resolver, resp, 200, "Could not get messages."))
            .catch((err: any)=>handleError(rej, err))
        });
    }

    /**
     * send a new message from a user to another user
     * 
     * @param {string} username - the name of the user sending the message
     * @param {string} content - the content of the message
     * @param {string} recipient - the recipient of the message
     * @returns {Promise<{}>} 
     * @memberof MessageService
     */
    addMessage(username: string, content: string, recipient: string): Promise<{}>{

        console.log('add post', username, content)

        return new Promise((res: Function, rej: Function)=>{
                    let data = new URLSearchParams();
                    data.append('username', username);
                    data.append('content', content);
                    data.append('recipient', recipient);

                    this.http.post(this._messageUrl, data)
                    .toPromise()
                    .then((resp: Response)=>assertStatus(res, resp, 201, "Could not add message."))
                    .catch((err: any)=>handleError(rej, err))
                });    
    }

    /**
     * delete a message
     * 
     * @param {string} username - the name of the user whose message should be deleted 
     * @param {number} idx - the index of the message to delete
     * @returns {Promise<{}>} 
     * @memberof MessageService
     */
    deleteMessage(username: string, idx: number): Promise<{}>{
        return new Promise((res: Function, rej: Function)=>{
            let data = new URLSearchParams();
            data.append('username', username);
            data.append('index', idx.toString());

            this.http.post(this._messageUrl, data)
            .toPromise()
            .then((resp: Response)=>assertStatus(res, resp, 204, "Could not delete message."))
            .then(()=>res())
            .catch((err: any)=>handleError(rej, err))
        });    
    }
}