import { Injectable } from '@angular/core'
import {Http, Response, URLSearchParams} from '@angular/http';

import { Post } from './../Post';

import {assertStatus, handleError} from '../../utils/handleResponse';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MessageService{

    private _messageUrl: string = "/message";

    constructor(
        private http: Http
    ){}

    getMessageCount(username: string) :Promise<number>{
        return this.getMessages(username).then(ms => ms.length);
    }

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