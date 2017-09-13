import { Component, OnInit, EventEmitter } from '@angular/core';

import { SignUpService } from './../../services/sign-up.service';

/**
 * Component allowing users to sign up for a new account
 * 
 * @export
 * @class SignUpComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'sign-up',
    outputs: ["signedUpEvent"],
    templateUrl: './sign-up.component.html',
    styleUrls:['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

    /**
     * event to be emitted when a user has signed up
     * 
     * @type {EventEmitter<String>}
     * @memberof SignUpComponent
     */
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
        private signUpService: SignUpService){
    }
    
    ngOnInit():void{
        // set the maximum DOB allowed in the sign up form to today's date
        this.DOBMax = this._getTodaysDate();
    }


    /**
     * Attempt to sign the user up for an account
     * 
     * @memberof SignUpComponent
     */
    signUp(){
        console.log('call sign up service')
        this.signUpService.signUp(this.username, this.location, this.DOB, this.business, this.picture, this.password)
        .then(()=>{console.log('response from sign up request ' + this.username); this.signedUpEvent.next(this.username)})
        .catch((err)=>this._handleSignUpError(err))
    }

    /**
     * extract the user's photo from the form
     * 
     * @param {*} event 
     * @memberof SignUpComponent
     */
    addPicture(event: any):void {
        this.picture = event.target.files[0];
    }

    /**
     * handle an error in the sign up attempt
     * 
     * @private
     * @param {*} error 
     * @memberof SignUpComponent
     */
    private _handleSignUpError(error: any){
        console.log(error)
        alert(error);
    }

    /**
     * get the current date
     * 
     * @private
     * @returns {string} 
     * @memberof SignUpComponent
     */
    private _getTodaysDate(): string{
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();

        return year + "-" + (month>9?month:"0"+month) + "-" + (day>9?day:"0"+day);
    }
}
