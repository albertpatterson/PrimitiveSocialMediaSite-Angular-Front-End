import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import {Observable} from 'rxjs/Observable';

import {mockUserData} from '../mockData/mockUserData';


@Injectable()
export class AuthService{

    private _session: string;

    private _loginUrl: string = "/session";

    constructor(
        private router: Router){}

    tryLogin(username: string, password: string): Promise<boolean>{
        console.log(mockUserData[username]);
        console.log(mockUserData[username].password)
        console.log(password)
        return new Promise(function(res:Function, rej:Function){
            if(mockUserData[username] && (mockUserData[username].password === password)){
                this._session = username;
                res();
            }else{
                rej("Invalid username or password.");
            }
        }.bind(this));
    }

    // _checkStatus(resp:Response){
    //     return resp.status === 201;
    // }


    trySignup(username: string, password: string): Promise<boolean>{
        return new Promise(function(res:Function, rej:Function){
            if(!mockUserData[username]){
                this._session = username;
                mockUserData.addUser(username, password);
                res(true);
            }else{
                res(false);
            }
        }.bind(this));
    }

    assertLoggedIn(username: string): Promise<boolean>{
        return new Promise(function(res:Function, rej:Function){
            console.log('session', this._session);

            if(username === this._session){
                res()
            }else{
                this.router.navigate(['/sign-in'])
                rej("Not logged in. Navigated to sign-in.");
            }
            
        }.bind(this))
    }

    signout(): Promise<any>{
        return Promise.resolve();
    }
}