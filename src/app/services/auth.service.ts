import { Injectable } from '@angular/core'

@Injectable()
export class AuthService{

    tryLogin(username: string, password: string): Promise<boolean>{
        return Promise.resolve(username==="member");
    }

    trySignup(username: string, password: string): Promise<boolean>{
        return Promise.resolve(username==="false");
    }

    checkLogin(): Promise<boolean>{
        // alert('checking login');
        // send a request to check session status
        return Promise.resolve(true);
    }

    signout(): Promise<any>{
        return Promise.resolve();
    }
}