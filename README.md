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
  - [x] member area
- [ ] services 
  - [x] authenticate user
  - [x] send and retrieve posts and messages
  - [x] searching for other users
  - [x] managing premium content added to the site

## Instalation
Clone this repository, then run<br>
$> npm install

## Usage
start the server by running<br>
$> npm start

This will open the sign in page. Currently the required login credentials are:<br>
username: "member"<br>
password: any character string between 1 and 10 characters in length

Currently, there is no back end provided, but in the future both a servlets API and a nodejs API will be available.

## TODO
* update services to communicate with backend
* consider style improvements
* add tests

