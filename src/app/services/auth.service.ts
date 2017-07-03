import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Http, Response, URLSearchParams  } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'

import {assertStatus, handleError} from '../utils/handleResponse'

@Injectable()
export class AuthService{

    private _loginUrl: string = "/session";

    constructor(
        private http: Http,
        private router: Router){}

    tryLogin(username: string, password: string): Promise<{}>{

        let data = new URLSearchParams();
        data.append('username', username);
        data.append('password', password);

        return  new Promise((res: Function, rej: Function)=>{
                    this.http.post(this._loginUrl, data)
                    .toPromise()
                    .then((resp: Response)=>assertStatus(res, resp, 201, "Sign-in failed"))
                    .catch((err)=>handleError(rej, err));
                });

        // return new Observable((o:any)=>o.next(true))

        // return   this.http.post(this._loginUrl, data)
        //         .map(this._checkStatus)
        //         .catch(this._handleError)
    }


    trySignup(username: string, password: string): Promise<boolean>{
        return Promise.resolve(username==="false");
    }

    assertLoggedIn(username: string): Promise<boolean>{
        // alert('checking login');
        // send a request to check session status
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

            // this.http.get(this._loginUrl, data)
            // .map(this._checkStatus)
            // .catch(this._handleError)

                // new Observable((o:any)=>o.next(username==="member"))
                // .subscribe(function(isLoggedIn:boolean){
                //     if(isLoggedIn){
                //         res();
                //     }else{
                //         this.router.navigate(['/sign-in'])
                //         rej("Not logged in. Navigated to sign-in.");
                //     }
                // }.bind(this))
        // }.bind(this))
    }

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