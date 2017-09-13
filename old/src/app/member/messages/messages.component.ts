import { Component, EventEmitter } from '@angular/core';

import {MessageService} from './../services/message.service';
// import {MessageService} from './../services/mock_message.service';

import {Post} from './../Post';


/**
 * Component used to display messages
 * 
 * @export
 * @class MessagesComponent
 */
@Component({
    selector: 'member-messages',
    inputs: ['username'],
    outputs: ['userSelect'],
    templateUrl: './messages.component.html',
    styleUrls: [
                    './messages.component.css'
                ]
})
export class MessagesComponent {

    /**
     * the user's username
     * 
     * @type {string}
     * @memberof MessagesComponent
     */
    private username: string;

    /**
     * event emitted when a user is selected from the messages component
     * 
     * @private
     * @type {EventEmitter<string>}
     * @memberof MessagesComponent
     */
    private userSelect: EventEmitter<string> = new EventEmitter();

    /**
     * messages sent to the user
     * 
     * @type {Post[]}
     * @memberof MessagesComponent
     */
    private messages: Post[];

    /**
     * Creates an instance of MessagesComponent.
     * @param {MessageService} messageService 
     * @memberof MessagesComponent
     */
    constructor(
        private messageService: MessageService
        ) {}

    /**
     * update the messages on init
     * 
     * @memberof MessagesComponent
     */
    ngOnInit(): void{
        this.messageService.getMessages(this.username)
        .then(function(messages: Post[]){
            this.messages=messages;
        }.bind(this));
    }

    /**
     * select a user
     * 
     * @private
     * @param {string} selectedUserName - the username of the user to select
     * @memberof MessagesComponent
     */
    private selectUser(selectedUserName: string){
        this.userSelect.next(selectedUserName);
    }
}