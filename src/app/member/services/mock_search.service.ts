import { Injectable } from '@angular/core'
import { User } from './../User';

import {mockUserData} from '../../mockData/mockUserData';


@Injectable()
export class SearchService{
    search(pattern: string): Promise<User[]> {
        const searchRegExp = new RegExp(pattern);
        let matches: User[] = [];
        console.log('mud', mockUserData)
        console.log('pattern', pattern)
        for(let name in  mockUserData){
            let user = mockUserData[name];
            console.log('user', user)
            if(user.name.match(searchRegExp)){
                matches.push(user);
            }
        }
        console.log('matches', matches)
        return new Promise(r=>setTimeout(()=>r(matches),1e3));                
    }
}