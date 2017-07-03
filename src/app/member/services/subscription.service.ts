import { Injectable } from '@angular/core'
import {Http, Response, URLSearchParams} from '@angular/http';

import {assertStatus, handleError} from '../../utils/handleResponse';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SubscriptionService{

    private _subscriptionUrl: string = "/subscription";

    constructor(
        private http: Http
    ){}


    getSubscriptions(username: string): Promise<String[]>{
        return new Promise((res: Function, rej: Function)=>{
            let data = new URLSearchParams();
            data.append('username', username);

            let resolver = (resp: Response)=>res(resp.json().data);

            this.http.get(this._subscriptionUrl, data)
            .toPromise()
            .then((resp: Response)=>assertStatus(resolver, resp, 204, "Could not get subscriptions."))
            .catch((err: any)=>handleError(rej, err))
        });  
    }

    addSubscription(username: string, followee: string): Promise<{}> {
        return new Promise((res: Function, rej: Function)=>{
                    let data = new URLSearchParams();
                    data.append('username', username);
                    data.append('followee', followee);

                    this.http.post(this._subscriptionUrl, data)
                    .toPromise()
                    .then((resp: Response)=>assertStatus(res, resp, 201, "Could not add subscription."))
                    .catch((err: any)=>handleError(rej, err))
                });  
    }

    deleteSubscription(username: string, followee: string): Promise<{}> {
        return new Promise((res: Function, rej: Function)=>{
            let data = new URLSearchParams();
            data.append('username', username);
            data.append('followee',followee);

            this.http.delete(this._subscriptionUrl, {search: data})
            .toPromise()
            .then((resp: Response)=>assertStatus(res, resp, 204, "Could not delete subscription."))
            .catch((err: any)=>handleError(rej, err))
        }); 
    }
}