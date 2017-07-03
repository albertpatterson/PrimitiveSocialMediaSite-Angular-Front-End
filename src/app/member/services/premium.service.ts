import {Injectable} from '@angular/core';

import {Http, Response, URLSearchParams} from '@angular/http';

import {assertStatus, handleError} from '../../utils/handleResponse';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PremiumService {
    
    private _premiumUrl = "/premium";
    
    constructor(
        private http: Http
    ){}

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

    addPremium(username: string, content: string): Promise<{}>{
        return new Promise((res:Function, rej: Function)=>{
            let data = new URLSearchParams();
            data.append("username", username);
            data.append("item", content);

            let resolver = ()=>res();

            this.http.post(this._premiumUrl, data)
            .toPromise()
            .then((resp: Response)=>assertStatus(resolver, resp, 201, "Unable to add premium item"))
            .catch((err: any)=>handleError(rej, err))
        });
    }

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