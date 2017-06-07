import {Injectable} from '@angular/core';

const mockPremiumItems = ["http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-21.jpg",
                        "http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg",
                        "http://cdn1-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-2.jpg",
                        "http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-5.jpg",
                        "https://www.cesarsway.com/sites/newcesarsway/files/styles/large_article_preview/public/All-about-puppies--Cesar%E2%80%99s-tips%2C-tricks-and-advice.jpg?itok=bi9xUvwe"];

@Injectable()
export class PremiumService{
    getPremiumItems(): Promise<string[]> {
        // return Promise.resolve(mockPremiumItems);
        return new Promise(r=>setTimeout(()=>r(mockPremiumItems),1e3));        
    }
}