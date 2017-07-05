import { Injectable } from '@angular/core'
import {Http, Response, URLSearchParams} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './../User';
import {assertStatus, handleError} from '../../utils/handleResponse';



@Injectable()
export class PersonalDataService{

    private _personalDataUrl = "/personalData";

    constructor(
        private http: Http
    ){}

    getUserData(username: string, desiredUserName: string): Promise<User> {
        let resolverFactory = (res: Function)=>(resp: Response)=>res(this._setAge(resp.json()));
        return this._getUserData(username, "desiredUserName", desiredUserName, resolverFactory);
    }

    private _setAge(user: any): User{
        user.age = Math.floor((Date.now()-Date.parse(user.DOB))/1000/60/60/24/365);
        return user;
    }

    searchUserData(username: string, desiredUserQuery: string): Promise<User[]> {
        let resolverFactory = (res: Function)=>(resp: Response)=>res(resp.json().data.map((user:any)=>this._setAge(user)));
        return this._getUserData(username, "desiredUserQuery", desiredUserQuery, resolverFactory);
    }

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