/**
 * a premium content item
 * 
 * @export
 * @class PremiumContent
 */
export class PremiumContent{
    public content: string;
    
    /**
     * Creates an instance of PremiumContent.
     * @param {string} content - content of the premium item
     * @memberof PremiumContent
     */
    constructor(content: string){
        this.content=content;
    }
}