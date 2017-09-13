import { Component, OnChanges, EventEmitter } from '@angular/core';

import {PersonalDataService} from './../services/personal-data.service';

import { User } from './../User';

/**
 * Component for searching for members on the site
 * 
 * @export
 * @class SearchComponent
 * @implements {OnChanges}
 */
@Component({
    selector: 'member-search',
    inputs: ['username', 'searchPattern'],
    outputs: ['userSelect'],
    templateUrl: './search.component.html',
    styleUrls: [
                    './search.component.css'
                ]    
})
export class SearchComponent implements OnChanges{

    /**
     * the name of the currently logged in user
     * 
     * @type {string}
     * @memberof SearchComponent
     */
    private username: string;

    /**
     * the search pattern to match with searching users
     * 
     * @type {string}
     * @memberof SearchComponent
     */
    private searchPattern: string;

    /**
     * event to be emitted when a user is selected from the search results
     * 
     * @type {EventEmitter<string>}
     * @memberof SearchComponent
     */
    public userSelect: EventEmitter<string> = new EventEmitter();

    /**
     * select a user from the search results
     * 
     * @param {string} name - the username of the selected user
     * @memberof SearchComponent
     */
    _selectUser(name: string): void{
        console.log('selected '+name);
        this.userSelect.next(name);
    }

    /**
     * groups of users, created for easy grid layout of search results
     * 
     * @type {User[][]}
     * @memberof SearchComponent
     */
    userGroups: User[][];

    /**
     * Creates an instance of SearchComponent.
     * @param {PersonalDataService} personalDataService 
     * @memberof SearchComponent
     */
    constructor(
        private personalDataService: PersonalDataService
        ){}

    /**
     * search for users that match the search pattern on changes to the page
     * 
     * @memberof SearchComponent
     */
    ngOnChanges(): void {
        console.log('searchpattern', this.searchPattern);
        this.personalDataService.searchUserData(this.username, this.searchPattern) 
        .then(function(users: User[]){
            this.userGroups = this._toGrid(users,3);
        }.bind(this))   
    }

    /**
     * convert the array of search results to a grid
     * 
     * @param {any[]} items - the items in the grid
     * @param {number} nCols - numbe of columns of the grid
     * @returns 
     * @memberof SearchComponent
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