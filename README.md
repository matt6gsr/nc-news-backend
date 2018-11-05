## NORTHCODERS NEWS BACKEND PROJECT

Northcoders News is a project to show understanding in JavaScript project development. In this backend section, I have built a restful API using MongoDB to store the data, express to build the server and mongoose to retrieve and manipulate the data. My hosted API is availible via the link below:

[Northcoders News](https://ncnews-matt6gsr.herokuapp.com/)

## Getting Started

To start running the written tests, clone the repo address and using the terminal window run the command:

```
git clone https://github.com/matt6gsr/nc-news-backend
```

Node.js is required to run this server. To check node is installed on your machine, in the terminal run the command:

```
node -v
```

If Node.js is not installed on your machine, please visit the link below for installation instructions

[Node.js](https://nodejs.org/en/download/)

CD into this repo/folder:

```
cd nc-news-backend
```

To install the required dependencies, run the command:

```
npm install
```

MongoDB is not a dependency, it is a database type and won't be installed automatically. To check this is installed on your machine, run the command:

```
mongo -version
```

If mongoDB is not installed, visit the MongoDB website in the link below and follow installation instructions:

- [MongoDB installation instructions](https://docs.mongodb.com/manual/installation/)

To interact with the database, start mongoDB listening by using the command:

```
mongod
```

To start the express server, seed the data to mongodDB and begin to explore the endpoints, run the command:

```
npm run dev
```

To reach the GET end points, the quickest option is to open a new web browser window and type in the URL:

```http
localhost:9090/api
```

`Postman` is the recommended interface to query all the end points:

- GET
- POST
- PATCH
- DELETE

See link below for full installation instructions and functionality.

[Postman Download](https://www.getpostman.com/)

## End Points

Here is a list of valid end points:

```http
GET /api
# Serves an HTML page with documentation for all the available endpoints
```

```http
GET /api/topics
# Gets all the topics
```

```http
GET /api/topics/:topic_slug/articles
# Returns all the articles for a certain topic
# e.g: `/api/topics/football/articles`
```

```http
POST /api/topics/:topic_slug/articles
# Adds a new article to a topic. This route requires a JSON body with title and body key value pairs
# e.g: `{ "title": "new article", "body": "This is my new article content", "created_by": "user_id goes here"}`
```

```http
GET /api/articles
# Returns all the articles
```

```http
GET /api/articles/:article_id
# Gets an individual article
```

```http
GET /api/articles/:article_id/comments
# Gets all the comments for a individual article
```

```http
POST /api/articles/:article_id/comments
# Adds a new comment to an article. This route requires a JSON body with body and created_by key value pairs
# e.g: `{"body": "This is my new comment", "created_by": "user_id goes here"}`
```

```http
PATCH /api/articles/:article_id
# Increments or Decrements the votes of an article by one. This route requires a vote query of 'up' or 'down'
# e.g: `/api/articles/:article_id?vote=up`
```

```http
PATCH /api/comments/:comment_id
# Increments or Decrements the votes of a comment by one. This route requires a vote query of 'up' or 'down'
# e.g: `/api/comments/:comment_id?vote=down`
```

```http
DELETE /api/comments/:comment_id
# Deletes a comment
```

```http
GET /api/users/:username
# e.g: `/api/users/mitch123`
# Returns a JSON object with the profile data for the specified user.
```

## Testing

All end points have been extensively tested for functionality and errors.

To begin testing, stop the express server from running:

```
ctrl & c
```

Note: make sure mongodb is still listening at this time.

There are 3 seperate databases; one for development, one for testing and one for production. The development database is seeded by default. The test database is seeded when testing, automatically. The production database is hosted and seeded seperately.

The test file is located in the `spec` folder and is named `index.spec.js`

To begin testing, run the command:

```
npm test
```

This will run all the tests, one by one.

To only run tests on certain end points, open the `index.spec.js` file and insert `.only` after `describe` within the desired endpoint:

```
describe('/topics', () => {
```

becomes

```
describe.only('/topics', () => {
```

To run specific tests for individual queries, open the `index.spec.js` file and insert `.only` after `it` in the desired test:

```
it('GET returns an array of objects containing all topics and a status code 200', () => {
```

becomes

```
it.only('GET returns an array of objects containing all topics and a status code 200', () => {
```

Note: Remember to remove the `.only` from the tests when finished.

## Links

- [Node](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Express](https://expressjs.com/)
- [EJS](http://ejs.co/)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [mocha](https://www.npmjs.com/package/mocha)
- [chai](https://www.npmjs.com/package/chai)
- [supertest](https://www.npmjs.com/package/supertest)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Postman](https://www.getpostman.com/)
- [mLab](https://mlab.com/)
- [Heroku](https://www.heroku.com)

## Acknowledgments

Author: Matt Hamilton
