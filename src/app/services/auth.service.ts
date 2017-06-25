import { Injectable } from '@angular/core'
import { Http, Response, RequestOptions, Headers, URLSearchParams  } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'

@Injectable()
export class AuthService{

    private _loginUrl: string = "/session";

    constructor(private http: Http){}

    tryLogin(username: string, password: string): Observable<boolean>{

        let data = new URLSearchParams();
        data.append('username', username);
        data.append('password', password);

        return   this.http.post(this._loginUrl, data)
                .map(this._checkStatus)
                .catch(this._handleError)
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

    checkLogin(username: string): Observable<boolean>{
        // alert('checking login');
        // send a request to check session status
        let data = new URLSearchParams();
        data.append('username', username);

        return   this.http.get(this._loginUrl, data)
                .map(this._checkStatus)
                .catch(this._handleError)
    }

    signout(): Promise<any>{
        return Promise.resolve();
    }
}