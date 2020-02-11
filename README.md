# score-keeper-capstone-server

Discscore is an app that allows users to quickly track their disc golf games, scores and locations.

## Working Prototype
[Sever Repo](https://github.com/thanneman/score-keeper-capstone-server)

[React Client Repo](https://github.com/thanneman/score-keeper-capstone-client)

[Live App](https://discscore.now.sh/)

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
Previous Game/Search Result Action |
![Previous Game](/github-images/wireframes/prevgame.jpg) |

## Screenshots

### **Landing/Login Page**
#### POST `api/auth/login`
<img src="/github-images/screenshots/landing.png" alt="Landing Page">

### **Sign Up Page**
#### POST `api/users`
<img src="/github-images/screenshots/signup.png" alt="Sign Up Page">

### **Dashboard**
#### GET `api/users/:user_id/games`
#### DELETE `api/users/:user_id/game/:game_id`
<img src="/github-images/screenshots/dashboard.png" alt="Dashboard Page">

### **Add New Game**
#### POST `api/users/:user_id/games`
<img src="/github-images/screenshots/newgame.png" alt="Sign Up Page">

## API Documentation

### Users Endpoints
`/users/:user_id` endpoints require an `authorization` header with value of `bearer YOUR_AUTH_TOKEN_HERE` which is assigned to the user after signing up for an account.

### POST `api/users`
Adds a new user to the user database and allows them to use their account to track the data they input. 

### POST `api/auth/login`
Allows a user in the database to login with the proper credentials. Returns the authToken and userId which allows them access to their information `/users/:user_id` endpoints as below.

### GET `api/users/:user_id/games`
Allows a logged-in user to access all of their games they have entered by returning an array of the data.

**Example response**
```JSON
[
    {
        "id": 24,
        "user_id": 5,
        "course_name": "Pebble Beach",
        "date": "2020-02-07 15:33:49",
        "course_par": 36,
        "front_score": 34,
        "back_score": 32,
        "notes": "I can’t believe they let disc golfers play here!"
    }
]
```

### DELETE `api/users/:user_id/games/:game_id`
Allows a logged-in user to delete a game using the `game_id` of the corresponding game.

A successful `DELETE` responds with `204 No Content`.

### POST `api/users/:user_id/games`
Allows a logged-in user to track a game with their relevant data.

**Example request body**
```JSON
{
    "course_name": "Pebble Beach",
    "date": "2020-02-07 15:33:49",
    "course_par": 36,
    "front_score": 34,
    "back_score": 32,
    "notes": "I can’t believe they let disc golfers play here!"
}
```
**Example response body**
```JSON
{
    "id": 24,
    "course_name": "Pebble Beach",
    "date": "2020-02-07 15:33:49",
    "course_par": 36,
    "front_score": 34,
    "back_score": 32,
    "notes": "I can’t believe they let disc golfers play here!"
}
```

## Business Objects (database structure)
* User
    * user id
    * username (email)
    * password (at least 7-20 char and a number)
    * date created

* Game Card
    * game id
    * course id
    * date
    * user id
    * front 9 score
    * back 9 score

## Technology
* Front-End: HTML5, CSS3, JavaScript, React
* Back-End: Node.js, Express.js, PostgreSQL, Mocha and Chai for testing
* Development Enviroment: Heroku

## Responsive
App is built to be usable on mobile devices, as well as responsive across mobile, tablet, laptop, and desktop screen resolutions.

## Scripts
Install node modules `npm install`

Run the tests `npm test`

Start the application `npm start`

Start nodemon for the application `npm run dev`