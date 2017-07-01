import {User} from "../member/User";
import {Post} from "../member/Post";


class UserData extends User{
    followedBy: string[];
    following: string[];
    ownPosts: Post[];
    messages: Post[];
    password: string;
    premiumContent: string[];
}

let imgCount = 0;
function imageIng(): string{
    imgCount = (imgCount + 1)%20
    return `static/${imgCount}.png`;
}

function makeMockUserData(username: string, following: string[], followedBy: string[]): UserData{
    return {
        name: username,
        age: 0,
        location: username+"_location",
        business: username+"business",
        picture: imageIng(),
        followedBy,
        following,
        ownPosts: [{poster: username, content: "post1"}, {poster: username, content: "post2"}],
        messages: [{poster: "friend1", content: "post1"}, {poster: "friend2", content: "post2"}],
        password: username+"pw",
        premiumContent: [imageIng(), imageIng(), imageIng()]
    };
}

let usernames = ["Anne", "Kim", "Dan", "Bob", "Pam", "Jen"];
let mud: any = {};

usernames.forEach((name:string, idx: number)=>{
    let start = (idx+1)%usernames.length;
    let followedBy = usernames.slice(start,start+2);
    start = (idx+3)%usernames.length;
    let following = usernames.slice(start,start+2);
    console.log(name, following);
    mud[name]=makeMockUserData(name, followedBy, following);
});


export let mockUserData = mud;

export function addUser(username: string, password: string){
    mud[username] = makeMockUserData(username, [], []);
    mud[username].password = password;
}

export function addPost(username: string, content: string){
    mud[username].ownPosts.push(new Post(username, content));
}

export function getOwnPosts(username: string): Post[]{
    return mud[username].ownPosts.slice();
}

export function addMessage(recipient: string, sender: string, content: string){
    mud[recipient].messages.push(new Post(sender, content));
}

export function getMessages(username: string): Post[]{
    return mud[username].messages.slice();
}

export function addPremuimContent(recipient: string): void{
    // mud[recipient].messages.push(new Post(sender, content));
}

export function getPremuimContent(username: string): Post[]{
    return mud[username].premiumContent.slice();
}