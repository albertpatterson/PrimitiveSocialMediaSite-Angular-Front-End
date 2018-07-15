import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {assertStatus, handleError} from '../utils/handleResponse'

import {AuthService} from './auth.service';

import {hashString} from "../utils/hashString";

/**
 * Service that allows new users to sign up for an account
 *
 * @export
 * @class SignUpService
 */
@Injectable()
export class SignUpService{

    /**
     * the url of the signUp resource
     *
     * @private
     * @memberof SignUpService
     */
    private _signUpUrl = document.location.origin+':9000/social-media/api/personalData';

    /**
     * Creates an instance of SignUpService.
     * @param {Http} http
     * @param {AuthService} authService
     * @memberof SignUpService
     */
    constructor(
        private http: Http,
        private authService: AuthService
    ){}

    /**
     * sign up for a member account and automatically sign in if successful
     *
     * @param {string} username - unique name of the user
     * @param {string} location - current location of the user
     * @param {string} DOB - the user's date of birth
     * @param {string} business - the business the user works in
     * @param {*} picture - the user's picture
     * @param {string} password - the user's password
     * @returns {Promise<{}>}
     * @memberof SignUpService
     */
    signUp(username: string, location: string, DOB: string, business: string, picture: any, password: string): Promise<{}>{
        console.log('send sign up request')
        return new Promise((res: Function, rej: Function)=>{

            let hashPass = hashString(password);

            let formData: FormData = new FormData();
            formData.append('username',username);
            formData.append('location',location);
            formData.append('DOB',DOB);
            formData.append('business',business);
            formData.append("picture", picture, picture.name);
            formData.append('password',hashPass);

            this.http.post(this._signUpUrl, formData)
            .toPromise()
            .then((resp:Response)=>assertStatus(res, resp, 201, "Could not create user."))
            .then(()=>this.authService.tryLogin(username, password))
            .catch((err:any)=>handleError(rej, err));
        });
    }

}
