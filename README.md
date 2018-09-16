## NORTHCODERS NEWS BACKEND PROJECT

Northcoders News is a project to show understanding in JavaScript. In this backend section, I have built a restful API using mongoDB to store the data, express to build the server and mongoose to retrieve and manipulate the data.
Below are some of the mongoose models used in this API:

- [find](http://mongoosejs.com/docs/api.html#model_Model.find)
- [findOne](http://mongoosejs.com/docs/api.html#model_Model.findOne)
- [findOneAndUpdate](http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate)
- [findOneAndRemove](http://mongoosejs.com/docs/api.html#model_Model.findOneAndRemove)
- [findById](http://mongoosejs.com/docs/api.html#model_Model.findById)
- [findByIdAndUpdate](http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate)
- [findByIdAndRemove](http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove)
- [update](http://mongoosejs.com/docs/api.html#model_Model.update)
- [create](https://mongoosejs.com/docs/api.html#model_Model.create)
- [remove](http://mongoosejs.com/docs/api.html#model_Model-remove)
- [save](http://mongoosejs.com/docs/api.html#model_Model-save)
- [count](http://mongoosejs.com/docs/api.html#model_Model.count)
- [populate](https://mongoosejs.com/docs/api.html#model_Model.populate)

## Getting Started

To interact with this API on your local machine please visit my github repo here:

```http
https://github.com/matt6gsr/BE2-northcoders-news
```

Please fork this repo.
Once forked, clone the repo address and using the terminal window run the command:

```
git clone https://github.com/matt6gsr/BE2-northcoders-news
```

To install all required dependencies, run the command:

```
npm i
```

Please check you have mongoDB installed:

```
mongo -version
```

If mongoDB is not installed, visit the MongoDB website in the link below and follow installation instructions:

- [MongoDB installation instructions](https://www.mongodb.com/)

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
# Get all the topics
```

```http
GET /api/topics/:topic_slug/articles
# Return all the articles for a certain topic
# e.g: `/api/topics/football/articles`
```

```http
POST /api/topics/:topic_slug/articles
# Add a new article to a topic. This route requires a JSON body with title and body key value pairs
# e.g: `{ "title": "new article", "body": "This is my new article content", "created_by": "user_id goes here"}`
```

```http
GET /api/articles
# Returns all the articles
```

```http
GET /api/articles/:article_id
# Get an individual article
```

```http
GET /api/articles/:article_id/comments
# Get all the comments for a individual article
```

```http
POST /api/articles/:article_id/comments
# Add a new comment to an article. This route requires a JSON body with body and created_by key value pairs
# e.g: `{"body": "This is my new comment", "created_by": "user_id goes here"}`
```

```http
PATCH /api/articles/:article_id
# Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down'
# e.g: `/api/articles/:article_id?vote=up`
```

```http
PATCH /api/comments/:comment_id
# Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down'
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

Note: make sure mongodb is still running at this time.

There are 3 seperate databases; one for development, one for testing and one for production. The development database is seeded by default. The test database is seeded when testing automatically. The production database is hosted and seeded seperately.

The test file is located in the `spec` folder and is named `index.spec.js`

To begin testing, run the command:

```
npm test
```

This will run all the tests, one by one.

To only run tests on certain end points, insert `.only` after `describe`:

```
describe('/topics', () => {
```

becomes

```
describe.only('/topics', () => {
```

To run specific tests for individual queries, insert `.only` after `it`:

```
it('GET returns an array of objects containing all topics and a status code 200', () => {
```

becomes

```
it.only('GET returns an array of objects containing all topics and a status code 200', () => {
```

Note: Remember to remove the `.only` from the tests when finished.

## Hosting

[Heroku](https://www.heroku.com) is a hosting website where projects like these can be uploaded; providing an enviroment outside of localhost to navigate the end points through your favorite web browser. The database is not seeded on Heroku. This is done on [mLab](https://mlab.com/) and negates the need for the user to download and create a database locally.

My API is availible via the link below:

[heroku link here]()

The mongoDB database seed is hosted at [mLab](https://mlab.com/).

## Acknowledgments

Paul R, Mitch, Paul C, Vel and all the Northcoders tutors that have helped me build this API, and with my journey so far. You're AWESOME!
