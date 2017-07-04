import { Component, EventEmitter } from '@angular/core';

import { AuthService } from './../../services/auth.service';

@Component({
    selector: 'sign-in',
    outputs: ["signedInEvent"],
    templateUrl: './sign-in.component.html',
    styleUrls:['./sign-in.component.css']
})
export class SignInComponent {
    
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
    
    signIn(): void {
        console.log(" sign in "+this.username+" "+this.password)
        this.authService.tryLogin(this.username, this.password)
        .then( ()=>this.signedInEvent.next(this.username) )
        .catch( this._handleLoginError.bind(this) );
    }

    _handleLoginError(error: any){
        console.log('login err', error)
        this.invalidCredentials = true;
        this.password = '';
        this.invalidCredentialsDiagnostic = this.invalidCredentialsBaseDiagnostic + (error?(" " + error):null);
    }
}
