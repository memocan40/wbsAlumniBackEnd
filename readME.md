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



## Description



## Technology
- [NodeJS](https://nodejs.org/en/)
- [Expressjs](https://expressjs.com/en/5x/api.html)
- [Socketio](https://socket.io/)
- [PostgresSQL](https://www.elephantsql.com/)
- [Deployed on Heroku](https://hidden-shelf-31461.herokuapp.com/)





## Database Schema
 ![Database](https://i.postimg.cc/MHDg8WNw/Untitled-1.png)




## API endpoints




```
GET All users
<br/>
```
https://hidden-shelf-31461.herokuapp.com/users
```
<br/>

GET user by id
<br/>
```
https://hidden-shelf-31461.herokuapp.com/users/:id
```
<br/>


DELETE user by id
<br/>
```
https://hidden-shelf-31461.herokuapp.com/users/delete/:id
```
<br/>


UPDATE user by id
<br/>
```
https://hidden-shelf-31461.herokuapp.com/users/update/:id
```
<br/>



GET all Workstatus
<br/>
```
https://hidden-shelf-31461.herokuapp.com/work_status
```
<br/>


GET all Batches
<br/>
```
https://hidden-shelf-31461.herokuapp.com/batches
```
<br/>

GET all Interests
<br/>
```
https://hidden-shelf-31461.herokuapp.com/interests
```
<br/>


UPLOAD picture
<br/>
```
https://hidden-shelf-31461.herokuapp.com/upload-profile-pic/:id
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