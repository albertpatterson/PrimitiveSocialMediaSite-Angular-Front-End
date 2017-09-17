import {Injectable} from '@angular/core';

import {Http, Response, URLSearchParams} from '@angular/http';

import {assertStatus, handleError} from '../../utils/handleResponse';

import 'rxjs/add/operator/toPromise';

/**
 * Service providing access to premium content
 * 
 * @export
 * @class PremiumService
 */
@Injectable()
export class PremiumService {
    
    /**
     * url of the premium resource
     * 
     * @private
     * @memberof PremiumService
     */
    private _premiumUrl = "api/premium";
    
    /**
     * Creates an instance of PremiumService.
     * @param {Http} http 
     * @memberof PremiumService
     */
    constructor(
        private http: Http
    ){}

    /**
     * get the premium items purchased by a user
     * 
     * @param {string} username 
     * @returns {Promise<string>} 
     * @memberof PremiumService
     */
    getPremium(username: string): Promise<string>{
        return new Promise((res: Function, rej: Function)=>{
            let data = new URLSearchParams();
            data.append("username", username);

            let resolver = (resp: Response)=>res(resp.json().data);

            this.http.get(this._premiumUrl, {search: data})
            .toPromise()
            .then((resp: Response)=>assertStatus(resolver, resp, 200, "Unable to get premium items"))
            .catch((err: any)=>handleError(rej, err))
        });
    }

    /**
     * purchase a new premium item
     * 
     * @param {string} username 
     * @param {string} content 
     * @returns {Promise<{}>} 
     * @memberof PremiumService
     */
    addPremium(username: string, content: any): Promise<{}>{
        return new Promise((res:Function, rej: Function)=>{

            let formData: FormData = new FormData();
            formData.append('username',username);
            formData.append("content", content, content.name);

            let resolver = ()=>res();

            this.http.post(this._premiumUrl, formData)
            .toPromise()
            .then((resp: Response)=>assertStatus(resolver, resp, 201, "Unable to add premium item"))
            .catch((err: any)=>handleError(rej, err))
        });
    }

    /**
     * delete a premium item
     * 
     * @param {string} username 
     * @param {number} index - index of the item to remove 
     * @returns {Promise<{}>} 
     * @memberof PremiumService
     */
    deletePremium(username: string, index: number): Promise<{}>{
        return new Promise((res:Function, rej: Function)=>{
            let data = new URLSearchParams();
            data.append("username", username);
            data.append("index", index.toString());

            let resolver = ()=>res();

            this.http.delete(this._premiumUrl, {search: data})
            .toPromise()
            .then((resp: Response)=>assertStatus(resolver, resp, 204, "Unable to delete premium item"))
            .catch((err: any)=>handleError(rej, err))
        });
    }
}