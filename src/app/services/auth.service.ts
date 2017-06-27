import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Http, Response, URLSearchParams  } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'

@Injectable()
export class AuthService{

    private _loginUrl: string = "/session";

    constructor(
        private http: Http,
        private router: Router){}

    tryLogin(username: string, password: string): Observable<boolean>{

        let data = new URLSearchParams();
        data.append('username', username);
        data.append('password', password);

        return new Observable((o:any)=>o.next(true))

        // return   this.http.post(this._loginUrl, data)
        //         .map(this._checkStatus)
        //         .catch(this._handleError)
    }

    _checkStatus(resp:Response){
        return resp.status === 201;
    }


    private _handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            errMsg = error.json().message;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }


    trySignup(username: string, password: string): Promise<boolean>{
        return Promise.resolve(username==="false");
    }

    assertLoggedIn(username: string): Promise<boolean>{
        // alert('checking login');
        // send a request to check session status
        let data = new URLSearchParams();
        data.append('username', username);

        return new Promise(function(res:Function, rej:Function){
            // this.http.get(this._loginUrl, data)
                // .map(this._checkStatus)
                // .catch(this._handleError)
                new Observable((o:any)=>o.next(username==="member"))
                .subscribe(function(isLoggedIn:boolean){
                    if(isLoggedIn){
                        res();
                    }else{
                        this.router.navigate(['/sign-in'])
                        rej("Not logged in. Navigated to sign-in.");
                    }
                }.bind(this))
        }.bind(this))
    }

    signout(): Promise<any>{
        return Promise.resolve();
    }
}