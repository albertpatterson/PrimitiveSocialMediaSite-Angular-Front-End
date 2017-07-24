import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {assertStatus, handleError} from '../utils/handleResponse'

import {AuthService} from './auth.service';

@Injectable()
export class SignUpService{
    
    private _signUpUrl = '/signUp';

    constructor(
        private http: Http,
        private authService: AuthService
    ){}

    signUp(username: string, location: string, DOB: string, business: string, picture: any, password: string): Promise<{}>{
        console.log('send sign up request')
        return new Promise((res: Function, rej: Function)=>{
        
            let formData: FormData = new FormData();
            formData.append('username',username);
            formData.append('location',location);
            formData.append('DOB',DOB);
            formData.append('business',business);
            formData.append("picture", picture, picture.name);
            formData.append('password',password);

            this.http.post(this._signUpUrl, formData)
            .toPromise()
            .then((resp:Response)=>assertStatus(res, resp, 201, "Could not create user."))
            .then(()=>this.authService.tryLogin(username, password))
            .catch((err:any)=>handleError(rej, err));
        });
    }

}