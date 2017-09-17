import { Injectable } from '@angular/core'
import {Http, Response, URLSearchParams} from '@angular/http';

import {assertStatus, handleError} from '../../utils/handleResponse';

import 'rxjs/add/operator/toPromise';

/**
 * Service providing access to subscriptions
 * 
 * @export
 * @class SubscriptionService
 */
@Injectable()
export class SubscriptionService{

    /**
     * url of the subscription resource
     * 
     * @private
     * @type {string}
     * @memberof SubscriptionService
     */
    private _subscriptionUrl: string = "api/subscription";

    /**
     * Creates an instance of SubscriptionService.
     * @param {Http} http 
     * @memberof SubscriptionService
     */
    constructor(
        private http: Http
    ){}

    /**
     * get the list of users followed by the current user
     * 
     * @param {string} username 
     * @returns {Promise<String[]>} 
     * @memberof SubscriptionService
     */
    getSubscriptions(username: string): Promise<String[]>{
        return new Promise((res: Function, rej: Function)=>{
            let data = new URLSearchParams();
            data.append('username', username);

            let resolver = (resp: Response)=>res(resp.json().data);

            this.http.get(this._subscriptionUrl, {search: data})
            .toPromise()
            .then((resp: Response)=>assertStatus(resolver, resp, 204, "Could not get subscriptions."))
            .catch((err: any)=>handleError(rej, err))
        });  
    }

    /**
     * follow a user
     * 
     * @param {string} username 
     * @param {string} followee 
     * @returns {Promise<{}>} 
     * @memberof SubscriptionService
     */
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

    /**
     * unfollow a user
     * 
     * @param {string} username 
     * @param {string} followee 
     * @returns {Promise<{}>} 
     * @memberof SubscriptionService
     */
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