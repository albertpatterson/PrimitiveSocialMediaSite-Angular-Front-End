import { Injectable } from '@angular/core'
import { Post } from './../Post';

import {mockUserData, addMessage, getMessages} from '../../mockData/mockUserData';

@Injectable()
export class MessageService{

    getMessageCount(username: string) :Promise<number>{
        // return Promise.resolve(mockPosts.length);
        return Promise.resolve(getMessages(username).length);
    }
    
    getMessages(username: string): Promise<Post[]> {
        // return Promise.resolve(mockPosts);
        // return new Promise(r=>setTimeout(()=>r(mockPosts),1e3));
        return Promise.resolve(getMessages(username));
    }

    addMessage(recipient: string, sender: string, content: string): void{
        addMessage(recipient, sender, content);
    }
}