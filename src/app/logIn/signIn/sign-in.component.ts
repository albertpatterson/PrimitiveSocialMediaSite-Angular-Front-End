import { Component, EventEmitter } from '@angular/core';

import { AuthService } from './../../services/auth.service';

/**
 * Component allowing users to sign into their existing account
 * 
 * @export
 * @class SignInComponent
 */
@Component({
    selector: 'sign-in',
    outputs: ["signedInEvent"],
    templateUrl: './sign-in.component.html',
    styleUrls:['./sign-in.component.css']
})
export class SignInComponent {
    
    /**
     * event to be emitted when the user has signed in
     * 
     * @type {EventEmitter<string>}
     * @memberof SignInComponent
     */
    public signedInEvent: EventEmitter<string> = new EventEmitter();
    
    username: string;
    usernamePattern: string = "\\w{1,10}";
    usernameDiagnostic: string = "username must be alphanumeric and be between 1 and 10 characters";
    
    password: string;
    passwordPattern: string = "\\S{1,10}"; 
    passwordDiagnostic: string = "password must contain no white space and be between 1 and 10 characters";

    invalidCredentials: Boolean = false;
    invalidCredentialsBaseDiagnostic: string = "Invalid username and/or password!";  
    invalidCredentialsDiagnostic: string = "";
    
    constructor(
        private authService: AuthService
        ){}
    
    /**
     * attempt to sign into a user's account
     * 
     * @memberof SignInComponent
     */
    signIn(): void {
        console.log(" sign in "+this.username+" "+this.password)
        this.authService.tryLogin(this.username, this.password)
        .then( ()=>this.signedInEvent.next(this.username) )
        .catch( this._updateUserOfLoginError.bind(this) );
    }

    /**
     * update the invalid login information shown to the user and reset password
     * 
     * @param {*} error 
     * @memberof SignInComponent
     */
    _updateUserOfLoginError(error: any){
        console.log('login err', error)
        this.invalidCredentials = true;
        this.password = '';
        this.invalidCredentialsDiagnostic = this.invalidCredentialsBaseDiagnostic + (error?(" " + error):null);
    }
}
