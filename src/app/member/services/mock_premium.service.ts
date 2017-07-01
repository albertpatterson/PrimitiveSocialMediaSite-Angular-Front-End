import {Injectable} from '@angular/core';

import {addPremuimContent, getPremuimContent} from '../../mockData/mockUserData';


@Injectable()
export class PremiumService{
    getPremiumItems(username: string): Promise<string[]> {
        // return Promise.resolve(mockPremiumItems);
        return new Promise(r=>setTimeout(()=>r(getPremuimContent(username)),1e3));        
    }
}