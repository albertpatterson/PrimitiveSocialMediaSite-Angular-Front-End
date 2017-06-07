import { Injectable } from '@angular/core'
import { User } from './../User';

const mockUsers: User[] = [
            {name: 'Carl', age: 20, location: '123456', business: "Engineering", picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4O2Co5dqpLNFY7y9SuBbpU0J0TVBuVtyC-iVgLNtyyGj7hPJ9WIYoDqs"},
            {name: 'Kim', age: 30, location: '098767', business: "Teaching", picture: "https://uploads.scratch.mit.edu/users/avatars/1385/1878.png"},
            {name: 'Bert', age: 40, location: '789078', business: "Construction", picture: "https://www.petfinder.com/wp-content/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg"},
            {name: 'Anne', age: 50, location: '188556', business: "Management", picture: "https://s-media-cache-ak0.pinimg.com/736x/e8/90/0a/e8900a07923cafc72c252e982163af0f.jpg"},
        ];

@Injectable()
export class SearchService{
    search(pattern: string): Promise<User[]> {
        // return Promise.resove(mockUsers);
        return new Promise(r=>setTimeout(()=>r(mockUsers),1e3));                
    }
}