# Primitive Social Media Site (Angular Front End)
This is a front end for the Primative Social Media Site project. This version of the front end is writting using Angular to provide the following features
- [x] components
  - [x] sign in page 
  - [x] member area
  - [x] member pages (children of member area)
    - [x] home
    - [x] other user
    - [x] search users
    - [x] messages
    - [x] premium content
- [x] routing
  - [x] sign in page 
- [x] services 
  - [x] authenticate user
  - [x] send and retrieve posts and messages
  - [x] searching for other users
  - [x] managing premium content added to the site

## Usage
This repository contains just the source code for the front end and is thus not ready for deployment. The transpiled code of this front end as well as compatible backends, ready for deployment, are available in different repositories: [MongoDB/Node.js/EXpress.js backend](https://github.com/albertpatterson/PrimitiveSocialMediaSite-API-Mongo-Node-Express) and [Java/Servlets/MongoDB backend](https://github.com/albertpatterson/PrimitiveSocialMediaSite-API-Mongo-Servlet). 

## Instalation
Clone this repository, then run<br>
$> npm install

Build the files using <br>
$> npm run build

## TODO
- [ ] consider style improvements
- [ ] add tests
- [ ] cosider adding chat feature using sockets

## Current Features
### Sign In Page
Features:
1) Current user sign in
2) New user sign up
<br>*screenshot placeholder*

### Members Area
Features:
1) Navigation - allows the user to navigate the different views offered to members
2) User Search - allows the user to search for other users
Views:
1) Home - shows a collection of posts created by users that the current user is following
<br>*screenshot placeholder*
2) Profile - shows the picture and personal details of a user as well as that user's posts
<br>*screenshot placeholder*
3) Messages - shows the messages sent to the current user by other users
<br>*screenshot placeholder*
4) Premium Content - shows the premium content purchased by the current user
<br>*screenshot placeholder*


