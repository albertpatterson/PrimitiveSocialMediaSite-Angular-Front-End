import {Component, OnInit} from '@angular/core';

import {PremiumService} from './../services/premium.service';
// import {PremiumService} from './../services/mock_premium.service';

import {PremiumContent} from '../PremiumContent';

import { createUrl } from "../../utils/imageUrl";


/**
 * Component providing viewing and purchase of premium content
 * 
 * @export
 * @class PremiumComponent
 * @implements {OnInit}
 */
@Component({
    selector: "member-premium",
    inputs: ['username'],
    templateUrl: './premium.component.html',
    styleUrls: ['./premium.component.css']
})
export class PremiumComponent implements OnInit{

    /**
     * the name of the current user
     * 
     * @public
     * @type {string}
     * @memberof PremiumComponent
     */
    public username: string;

    /**
     * new premium content to be added
     * 
     * @public
     * @type {*}
     * @memberof PremiumComponent
     */
    public newContent: any;

    /**
     * groups of premium content for grid layout
     *
     * @public
     * @type {string[][]}
     * @memberof PremiumComponent
     */
    public premiumGroups: string[][];

    public imageUrl=createUrl;

    /**
     * Creates an instance of PremiumComponent.
     * @param {PremiumService} premiumService
     * @memberof PremiumComponent
     */
    constructor(
        private premiumService: PremiumService
    ){}

    /**
     * get the user's premium content and populate the grid on init
     *
     * @memberof PremiumComponent
     */
    ngOnInit(): void{

        this.premiumService.getPremium(this.username)
        .then(function(premiumItems: PremiumContent[]){
            let premiumStrings = premiumItems.map((item: PremiumContent)=>item.content);
            this.premiumGroups = this._toGrid(premiumStrings,3);
        }.bind(this))
    }

    /**
     * submit new premium content
     *
     * @memberof PremiumComponent
     */
    onSubmit():void{
        this.premiumService.addPremium(this.username, this.newContent)
        .then(()=>this.premiumService.getPremium(this.username))
        .then(function(premiumItems: PremiumContent[]){
            let premiumStrings = premiumItems.map((item: PremiumContent)=>item.content);
            this.premiumGroups = this._toGrid(premiumStrings,3);
        }.bind(this));
    }

    selectContent(event: any):void {
        this.newContent = event.target.files[0];
    }

    /**
     * create a grid
     *
     * @param {any[]} items
     * @param {number} nCols
     * @returns
     * @memberof PremiumComponent
     */
    _toGrid(items: any[], nCols: number){
        let grid = [];
        const max=nCols*Math.ceil(items.length/nCols);
        for(let idx=0; idx<max; idx+=nCols){
            grid.push(items.slice(idx, idx+nCols))
        }
        return grid;
    }
}
