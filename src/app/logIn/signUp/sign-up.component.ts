import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { SignUpService } from './../../services/sign-up.service';

@Component({
    selector: 'sign-up',
    outputs: ["signedUpEvent"],
    templateUrl: './sign-up.component.html',
    styleUrls:['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

    public signedUpEvent: EventEmitter<String> = new EventEmitter();

    username: string;
    usernamePattern: string = "\\w{1,10}";
    usernameDiagnostic: string = "username must be alphanumeric and be between 1 and 10 characters";
    
    password: string;
    passwordPattern: string = "\\S{1,10}"; 
    passwordDiagnostic: string = "password must contain no white space and be between 1 and 10 characters";

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
    
    constructor(
        private signUpService: SignUpService,
        private router: Router){
    }
    
    ngOnInit():void{
        this.DOBMax = this._getTodaysDate();
    }

    signUp(){
        // this.signedUpEvent.next(this.username)
    }

    private _handleSignUpError(error: any){

    }

    private _getTodaysDate(): string{
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();

        return year + "-" + (month>9?month:"0"+month) + "-" + (day>9?day:"0"+day);
    }
}
