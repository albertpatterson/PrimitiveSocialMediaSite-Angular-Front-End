import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'message-form',
    templateUrl: "./message-form.component.html",
    styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent {

    postContent: string;

    @Input() rows: string;
    @Input() label: string;

    @Output() postSubmitted = new EventEmitter<string>();

    submitPost():void{
        this.postSubmitted.emit(this.postContent);
        this.postContent = "";
    }
}