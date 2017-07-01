import {Component, OnInit} from '@angular/core';

// import {PremiumService} from './../services/premium.service';
import {PremiumService} from './../services/mock_premium.service';


@Component({
    selector: "member-premium",
    inputs: ['username'],
    templateUrl: './premium.component.html',
    styleUrls: ['./../member.component.css', './premium.component.css']
})
export class PremiumComponent implements OnInit{

    public username: string;

    premiumGroups: string[][];

    constructor(private premiumService: PremiumService){}

    ngOnInit(): void{

        this.premiumService.getPremiumItems(this.username)
        .then(function(premiumItems: string[]){
            this.premiumGroups = this._toGrid(premiumItems,3);
        }.bind(this))
    }

    onSubmit():void{
        console.log('submitted!');
    }

    _toGrid(items: any[], nCols: number){
        let grid = [];
        const max=nCols*Math.ceil(items.length/nCols);
        for(let idx=0; idx<max; idx+=nCols){
            grid.push(items.slice(idx, idx+nCols))
        }
        return grid;
    }
}