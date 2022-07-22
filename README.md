# Easy Poll Web Application

Create online polls easily and evaluate the results in real-time! 

## Technology Stack
<p>Client-Side<br></p>

* ReactJS
* TailwindCSS
* Socket.io-client

<p>Server-Side<br></p>

* NodeJS
* ExpressJS
* Mongoose (MongoDB)
* Nodemailer
* Socket.io

  
## To-Do
1. - [x] Fix create poll endpoint
2. - [x] Add ability to search for polls on home page
3. - [x] Add IP address tracking to limit voting multiple times
4. - [x] Fix IP tracking to not generate random ID based off of IP address
5. - [x] Fix NaN from displaying when an item has zero votes
6. - [x] Fix socket parameter issues
7.  - [x] Add spinner to components that render data so that page doesn't look as choppy on mount
8.  - [ ] Fix poll to actually deactivate status when poll is supposed to end
9.  - [ ] Implement mobile version 
10. - [ ] Add option to delete polls
11. - [ ] Refactor refresh token method with nodemailer to correctly generate new token
12. - [ ] Implement session tokens based on device
