import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { AuthService } from './../services/auth.service';
import { AuthService } from './../services/mock_auth.service';

class Model {
    username: "";
}

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls:['./sign-in.component.css']
})
export class SignInComponent implements OnInit{
    username: string;
    usernamePattern: string = "\\w{1,10}";
    usernameDiagnostic: string = "username must be alphanumeric and be between 1 and 10 characters";
    
    password: string;
    passwordPattern: string = "\\S{1,10}"; 
    passwordDiagnostic: string = "password must contain no white space and be between 1 and 10 characters";

    signUpUsername: string = this.username;
    
    signUpPassword: string =this.password;

    location: string;
    locationPattern: string = ".*"; 
    locationDiagnostic: string = "Your current location";

    DOB: string;
    DOBMax: string;
    DOBDiagnostic: string = "Your birth date";

    business: string;
    businessPattern: string = ".*"; 
    businessDiagnostic: string = "Your current business"; 

    picture: any;
    pictureDiagnostic: string = "Your photo";

    invalidCredentials: Boolean = false;
    invalidCredentialsBaseDiagnostic: string = "Invalid username and/or password!";  
    invalidCredentialsDiagnostic: string = "";
    
    constructor(
        private authService: AuthService,
        private router: Router){
    }
    
    ngOnInit():void{
        this.DOBMax = this._getTodaysDate();
    }

    signIn(): void {

        this.authService.tryLogin(this.username, this.password)
        .then(this._handleLoginResult.bind(this))
        .catch(this._handleLoginError.bind(this));
    }

    _handleLoginResult(isValid: boolean): void{
        if(isValid){
            // this.router.navigate(["member", this.username, "home"])
            this.router.navigate(["member", this.username]);
        }else{
            this._handleLoginError('');
        }
    }

    _handleLoginError(error: any){
        this.invalidCredentials = true;
        this.password = '';
        this.invalidCredentialsDiagnostic = this.invalidCredentialsBaseDiagnostic + (error?(" " + error):null);
    }

    signUp(): void {
        this.signIn();
    }

    addPicture(event: any): void{
        this.picture = event.srcElement.files[0];
        console.log(this.picture);
    }

    _getTodaysDate(): string{
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();

        return year + "-" + (month>9?month:"0"+month) + "-" + (day>9?day:"0"+day);
    }
}
