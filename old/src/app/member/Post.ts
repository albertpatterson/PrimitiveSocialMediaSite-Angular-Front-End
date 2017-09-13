/**
 * a post or message
 * 
 * @export
 * @class Post
 */
export class Post{
    poster: string;
    content: string;
    timestamp: string;
    /**
     * Creates an instance of Post.
     * @param {string} poster - the username of the posts
     * @param {string} content - the content of the post
     * @param {string} timestamp - the time when the post was created
     * @memberof Post
     */
    constructor(poster: string, content: string, timestamp: string){
        this.poster = poster;
        this.content = content;
        this.timestamp = timestamp
    }
};