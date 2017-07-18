import {Component, EventEmitter} from '@angular/core';

@Component({
    selector: "post",
    inputs: ["poster", "timestamp", "content"],
    outputs: ["userSelect"],
    templateUrl: "./post.component.html",
    styleUrls: ['./../../member.component.css',"./post.component.css"]
})
export class PostComponent{
    public poster: string;
    public timestamp: string;
    public content: string;

    public userSelect: EventEmitter<string> = new EventEmitter();

    selectUser(otherUsername: string): void{
        this.userSelect.next(otherUsername);
    }
}