import { Injectable } from '@angular/core'
import {Http, Response, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './../User';
import {assertStatus, handleError} from '../../utils/handleResponse';


/**
 * Service providing access to a user's personal data
 * 
 * @export
 * @class PersonalDataService
 */
@Injectable()
export class PersonalDataService{

    /**
     * url of the personalData resource
     * 
     * @private
     * @memberof PersonalDataService
     */
    private _personalDataUrl = "api/personalData";

    /**
     * Creates an instance of PersonalDataService.
     * @param {Http} http 
     * @memberof PersonalDataService
     */
    constructor(
        private http: Http
    ){}

    /**
     * get the personal data of a user
     * 
     * @param {string} username - the username of the signed in user
     * @param {string} desiredUserName - the username of the user whose personal data is desired
     * @returns {Promise<User>} 
     * @memberof PersonalDataService
     */
    getUserData(username: string, desiredUserName: string): Promise<User> {
        let resolverFactory = (res: Function)=>(resp: Response)=>res(this._setAge(resp.json()));
        return this._getUserData(username, "desiredUserName", desiredUserName, resolverFactory);
    }

    /**
     * update the user object to include the user's age, based on their DOB
     * 
     * @private
     * @param {*} user - the personal data object of the user
     * @returns {User} 
     * @memberof PersonalDataService
     */
    private _setAge(user: any): User{
        user.age = Math.floor((Date.now()-Date.parse(user.DOB))/1000/60/60/24/365);
        return user;
    }

    /**
     * return user data for users matching a query
     * 
     * @param {string} username - the name of the logged in user
     * @param {string} desiredUserQuery - query to match other users
     * @returns {Promise<User[]>} 
     * @memberof PersonalDataService
     */
    searchUserData(username: string, desiredUserQuery: string): Promise<User[]> {
        let resolverFactory = (res: Function)=>(resp: Response)=>res(resp.json().data.map((user:any)=>this._setAge(user)));
        return this._getUserData(username, "desiredUserQuery", desiredUserQuery, resolverFactory);
    }

    /**
     * get the user data of a single user or multiple users
     * 
     * @private
     * @param {string} username - the username of the currently signed in user
     * @param {string} paramType - parameter specifying how to identify users ("desiredUserName" or "desiredUserQuery")
     * @param {string} param - the name of the user or the search query
     * @param {Function} resolverFactory - function creating a resolver to handle the retrieved data
     * @returns {Promise<any>} 
     * @memberof PersonalDataService
     */
    private _getUserData(username: string, paramType:string,  param: string, resolverFactory: Function): Promise<any>{
        return new Promise((res: Function, rej: Function)=>{
            let data = new URLSearchParams();
            data.append('username', username);
            data.append(paramType, param);

            let resolver = resolverFactory(res);
            this.http.get(this._personalDataUrl, {search: data})
            .toPromise()
            .then((resp: Response)=>assertStatus(resolver, resp, 200, "Could not get personal data."))
            .catch((err: any)=>handleError(rej, err))
        });
    }
}