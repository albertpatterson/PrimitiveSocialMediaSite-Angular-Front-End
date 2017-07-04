import {Component} from '@angular/core';

@Component({
    selector: "post",
    inputs: ["poster", "timestamp", "content"],
    templateUrl: "./post.component.html",
    styleUrls: ['./../../member.component.css',"./post.component.css"]
})
export class PostComponent{
    public poster: string;
    public timestamp: string;
    public content: string;
}