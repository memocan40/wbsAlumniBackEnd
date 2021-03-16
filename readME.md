# WBS Alumni Backend Repository


## Collaborators

[David](https://github.com/DavidSurina), [Memo](https://github.com/memocan40), [Alex](https://github.com/olkhon) and [Elie](https://github.com/Elie-Soued)


## Table of Contents 
  - [Collaborators](#collaborators)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Technology](#technology)
  - [Database Schema](#database-schema)
  - [API endpoints](#api-endpoints)
  - [Posts](#posts)
  - [Post Response Sample](#post-response-sample)
  - [Users](#users)
  - [User Response Sample](#user-response-sample)
  - [Resources](#resources)


## Description



## Technology
- [NodeJS](https://nodejs.org/en/)
- [Expressjs](https://expressjs.com/en/5x/api.html)
- [Socketio](https://socket.io/)
- [PostgresSQL](https://www.elephantsql.com/)
- [SQL](https://www.w3schools.com/SQL/default.asp)
- [Deployed on Heroku](https://hidden-shelf-31461.herokuapp.com/)

<> (Do we want to use Travis and Mocha ?)

- [Test platform travis.yml](https://github.com/travis-ci/travis-yml)/ [travis.yml](https://docs.travis-ci.com/user/tutorial/)
- [Test framework mocha](https://mochajs.org/)
- [Assertion Libary chai](https://www.chaijs.com/)



## Database Schema
 ![Database](https://i.postimg.cc/MHDg8WNw/Untitled-1.png)




### API endpoints

Update user

<br/>
```
https://hidden-shelf-31461.herokuapp.com/users/update/:id

keys

first_name
last_name
batch
city
work_status
github
linkedin
picture


```
<br/>

Post filtered by id 
<br/>
```
GET /posts/:id
```
<br/>

All posts ordered by rating
<br/>
```
GET /posts?sort=rating:desc
```
<br/>

All posts filtered by topic
<br/>
```
GET /posts?topic=%topic%
```
<br/>

All posts filtered by title
<br/>
```
GET /posts?search=%title%
```
<br/>


## Post Response Sample

```
{
  "message": "sucessfully sent",
  "status": 200,
  "count": 21,
  "data": [
    {
      "json_build_object": {
        "id": 15,
        "title": "No Men Allowed… Until Now",
        "description": "FINA introduced a new mixed duet competition at the 2015 World Aquatics Championships.",
        "rating": 5,
        "image_url": "https://i.dailymail.co.uk/i/newpix/2018/07/06/16/4DFB9AEB00000578-5920727-image-m-53_1530889891348.jpg",
        "topic": {
          "id": 4,
          "name": "Synchronized Swimming"
        },
        "user": {
          "id": 4,
          "username": "Avril Ymayo",
          "email": "ymayo@avril.com",
          "avatar": "https://i.pinimg.com/736x/34/70/8b/34708b157e918da6a0254637312aa804--wrestling-costumes-wrestling-outfits.jpg",
          "premium": {
            "id": 2,
            "level": "top"
          }
        }
      }
    }
  ]
}

```




### Users
All users
<br/>
```
GET /users
```
<br/>

User filtered by id 
<br/>
```
GET /users/:id
```
<br/>


## User Response Sample

```
{
  "message": "sucessfully sent",
  "status": 200,
  "count": 4,
  "data": [
    {
      "json_build_object": {
        "id": 4,
        "username": "Avril Ymayo",
        "email": "ymayo@avril.com",
        "avatar": "https://i.pinimg.com/736x/34/70/8b/34708b157e918da6a0254637312aa804--wrestling-costumes-wrestling-outfits.jpg",
        "premium": {
          "id": 2,
          "level": "top"
        }
      }
    }
  ]
}

```


### Resources
- [Get HTTP POST Body](https://stackabuse.com/get-http-post-body-in-express-js/)
- [Best Practices for Naming API Endpoints](https://nordicapis.com/10-best-practices-for-naming-api-endpoints/)
- [Handle GET and POST Request in Express](https://codeforgeek.com/handle-get-post-request-express-4/)



packages:
https://www.npmjs.com/package/password-hash