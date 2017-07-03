import { Component } from '@angular/core';

import {MessageService} from './../services/message.service';
// import {MessageService} from './../services/mock_message.service';

import {Post} from './../Post';


@Component({
    selector: 'member-messages',
    inputs: ['username'],
    templateUrl: './messages.component.html',
    styleUrls: [
                    './../member.component.css',
                    './messages.component.css'
                ]
})
export class MessagesComponent {

    public username: string;

    messages: Post[];

    constructor(
        private messageService: MessageService) {}

    ngOnInit(): void{
        this.messageService.getMessages(this.username)
        .then(function(messages: Post[]){
            this.messages=messages;
        }.bind(this));
    }
}