import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Http, Response, URLSearchParams  } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'

import {hashString} from "../utils/hashString";

import {assertStatus, handleError} from '../utils/handleResponse'

/**
 * Service used to authenticate users and provide access to the members area
 * 
 * @export
 * @class AuthService
 */
@Injectable()
export class AuthService{

    /**
     * url providing access to the session resource
     * 
     * @private
     * @type {string}
     * @memberof AuthService
     */
    private _loginUrl: string = document.location.origin+":9000/social-media/api/session";

    /**
     * Creates an instance of AuthService.
     * @param {Http} http 
     * @param {Router} router 
     * @memberof AuthService
     */
    constructor(
        private http: Http,
        private router: Router){}

    /**
     * attempt to log in
     * 
     * @param {string} username 
     * @param {string} password 
     * @returns {Promise<{}>} 
     * @memberof AuthService
     */
    tryLogin(username: string, password: string): Promise<{}>{

        let hashPass = hashString(password);

        let data = new URLSearchParams();
        data.append('username', username);
        data.append('password', hashPass);

        return  new Promise((res: Function, rej: Function)=>{
                    this.http.post(this._loginUrl, data)
                    .toPromise()
                    .then((resp: Response)=>assertStatus(res, resp, 201, "Sign-in failed"))
                    .catch((err)=>handleError(rej, err));
                });
    }

    /**
     * assert that a user is logged with a valid session in and redirect to the log in page if not
     * 
     * @param {string} username 
     * @returns {Promise<boolean>} 
     * @memberof AuthService
     */
    assertLoggedIn(username: string): Promise<boolean>{

        console.log("check session "+username);

        let data = new URLSearchParams();
        data.append('username', username);

        return  new Promise(function(res:Function, rej:Function){

                    let rejector = ()=>{this.router.navigate(['/sign-in']); rej()};

                    this.http.get(this._loginUrl, {search: data})
                    .toPromise()
                    .then((resp: Response)=>assertStatus(res, resp, 200, "invalid session"))
                    .catch((err:any)=>handleError(rejector, err));
                }.bind(this));
    }

    /**
     * sign out and delete the user's session
     * 
     * @param {string} username 
     * @returns {Promise<any>} 
     * @memberof AuthService
     */
    signout(username: string): Promise<any>{

        console.log("delete session "+username);

        let data = new URLSearchParams();
        data.append('username', username);

        return  new Promise(function(res:Function, rej:Function){
                    this.http.delete(this._loginUrl, {search: data})
                    .toPromise()
                    .then((resp: Response)=>assertStatus(res, resp, 204, "invalid session, signout failed"))
                    .catch((err:any)=>handleError(rej, err));
                }.bind(this));
    }
}
