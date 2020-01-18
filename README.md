# score-keeper-capstone-server

Disc Golf Score Keeper was created by Travis Hanneman using the following tools:
* Front-End: HTML5, CSS3, JavaScript, React
* Back-End: Node.js, Express.js, PostgreSQL, Mocha and Chai for testing
* Development Enviroment: Heroku

## Working Prototype
Coming soon

## User Stores
This app has two types of users; visitor and logged-in user

#### Landing Page
* As a visitor
* I want to understand what the app is and what I can do with it
* Sign up or log in

#### Sign Up
* As a visitor
* I want to register to use this app
* So I can keep score of my disc golf games

#### Start Scoring Games
* As a logged-in user
* I want to see how to start a new game card
* So I can keep track of my games and courses

#### Previous Games/Search Result Action
* As a logged-in user
* I want to see my previous game card details (course, scores, notes)
* So I can see a previous game card

#### New Game
* As a logged-in user
* I want to start a new game card
* So I can capture details about my game (course, scores, notes)

#### Search Error
* As a logged-in user
* I want to know if there is an error in my search
* So I can search for a certain game card(s)

#### Search Results
* As a logged-in user
* I want to look for and click on the item from my search
* So I can see a previous game card

## Wireframes
Landing/Login Page | Sign Up Page
:-------------------------:|:-------------------------:
![Landing/Login Page](/github-images/wireframes/landing.jpg)  |  ![Sign Up Page](/github-images/wireframes/signup.jpg)
Dashboard/Search Page | New Game
![Dashboard](/github-images/wireframes/dashboard.jpg) | ![New Game](/github-images/wireframes/newgame.jpg)
Previous Game/Search Result Action | Search Error
![Previous Game](/github-images/wireframes/prevgame.jpg) | ![Search Error](/github-images/wireframes/searcherror.jpg)

## Screenshots

## Functionality

## Business Objects (database structure)
* User
    * user id
    * username (email)
    * password (at least 8-20 char and a number)

* Game Card
    * game id
    * course id
    * user id
    * score value

* Holes
    * hole id
    * hole number
    * game id
    * hole score value

* Notes
    * notes id
    * game id
    * note message

## Technology
* Front-End: HTML5, CSS3, JavaScript, React
* Back-End: Node.js, Express.js, PostgreSQL, Mocha and Chai for testing
* Development Enviroment: Heroku

## Responsive
App is built to be usable on mobile devices, as well as responsive across mobile, tablet, laptop, and desktop screen resolutions.