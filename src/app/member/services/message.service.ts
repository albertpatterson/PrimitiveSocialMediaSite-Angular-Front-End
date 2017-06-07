import { Injectable } from '@angular/core'
import { Post } from './../Post';

const mockPosts = [
            {poster: 'Carl', content: "Message From Carl"},
            {poster: 'Alan', content: "Message From Alan"},
            {poster: 'Mike', content: "Message From Mike"}
        ];

@Injectable()
export class MessageService{

    getMessageCount() :Promise<number>{
        // return Promise.resolve(mockPosts.length);
        return this.getMessages().then(ms => ms.length)
    }
    
    getMessages(): Promise<Post[]> {
        // return Promise.resolve(mockPosts);
        return new Promise(r=>setTimeout(()=>r(mockPosts),1e3));
    }
}