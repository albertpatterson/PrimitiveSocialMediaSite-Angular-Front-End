import { Component } from '@angular/core';

import {MessageService} from './../services/message.service';

import {Post} from './../Post';


@Component({
    selector: 'member-messages',
    templateUrl: './messages.component.html',
    styleUrls: [
                    './../member.component.css',
                    './messages.component.css'
                ]
})
export class MessagesComponent {

    messages: Post[];

    constructor(
        private messageService: MessageService) {}

    ngOnInit(): void{
        this.messageService.getMessages()
        .then(function(messages: Post[]){
            this.messages=messages;
        }.bind(this));
    }
}