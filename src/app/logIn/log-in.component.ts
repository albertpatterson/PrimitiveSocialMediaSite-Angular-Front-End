import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: "log-in",
    templateUrl: "./log-in.component.html",
    styleUrls:  ["./log-in.component.css"]
})
export class LogInComponent{

    constructor(
        private router: Router
    ){}

    goHome(username: string){
        console.log("go home "+username)
        this.router.navigate(["member", username]);
    }
}