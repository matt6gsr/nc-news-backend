process.env.NODE_ENV = 'test';
const data = require('../seed/testData/index');
const seedDB = require('../seed/seed');
const { expect } = require('chai');
const app = require('../app');
const request = require('supertest')(app);
const mongoose = require('mongoose');

describe('/api', () => {
  let articles, comments, topics, users;

  beforeEach(() => {
    return seedDB(data).then(docs => {
      [articles, comments, topics, users] = docs;
    });
  });

  after(() => mongoose.disconnect());

  describe('/topics', () => {
    it('GET returns an array of objects containing all topics and a status code 200', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(res => {
          expect(res.body.topics).to.have.length(topics.length);
        });
    });
    it('GET responds with a 404 for an invalid route', () => {
      return request
        .get('/topic')
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal('Page Not Found....!');
        });
    });
  });
  describe('/topics/:topic_slug/articles', () => {
    it('GET returns an array of objects containing all articles of the searched topic and a status code 200', () => {
      return request
        .get('/api/topics/mitch/articles')
        .expect(200)
        .then(res => {
          expect(res.body.articles[0].title).to.equal(
            'Living in the shadow of a great man'
          );
          expect(res.body.articles[1].created_by.username).to.equal(
            'dedekind561'
          );
          expect(res.body.articles.length).to.equal(2);
        });
    });
    it('GET responds with a status code 404 for invalid topic', () => {
      return request
        .get('/api/topics/abc/articles')
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal('Topic Not Found');
        });
    });
    it('POST adds a new article with the correct fields and responds with a 201 status code', () => {
      return request
        .post('/api/topics/mitch/articles')
        .send({
          title: 'Post Test',
          body: 'Test body',
          created_by: mongoose.Types.ObjectId()
        })
        .expect(201)
        .then(res => {
          expect(res.body.article).to.contain.keys(
            'votes',
            '_id',
            'title',
            'body',
            'created_by',
            'belongs_to',
            'created_at',
            '__v'
          );
          expect(res.body.article.title).to.equal('Post Test');
        });
    });
    it('POST gives a validation error and an error status code 400 for a post with invalid key names', () => {
      return request
        .post('/api/topics/mitch/articles')
        .send({
          title: 'Post Test',
          bod: 'Test body',
          created_by: mongoose.Types.ObjectId()
        })
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal(
            'articles validation failed: body: Path `body` is required.'
          );
        });
    });
    it('POST gives a validation error and an error status code 400 for a post with missing required field', () => {
      return request
        .post('/api/topics/mitch/articles')
        .send({
          title: '',
          body: 'Test body',
          created_by: mongoose.Types.ObjectId()
        })
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal(
            'articles validation failed: title: Path `title` is required.'
          );
        });
    });
    it('POST gives a validation error and an error status code 400 for a post with an invaild mongoId', () => {
      return request
        .post('/api/topics/mitch/articles')
        .send({
          title: 'Post test',
          body: 'Test body',
          created_by: '12345'
        })
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal(
            'articles validation failed: created_by: Cast to ObjectID failed for value "12345" at path "created_by"'
          );
        });
    });
    it('POST gives a 404 status code for a valid post posting to a non-existent topic', () => {
      return request
        .post('/api/topics/abc/articles')
        .send({
          title: 'Post test',
          body: 'Test body',
          created_by: mongoose.Types.ObjectId()
        })
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal('Topic not found, cannot post');
        });
    });
  });
  describe('/articles', () => {
    it('GET returns an array of objects containing all articles and a status code 200', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(res => {
          expect(res.body[0].title).to.equal(
            'Living in the shadow of a great man'
          );
          expect(res.body.length).to.equal(4);
        });
    });
    it('GET returns a comment count for each article and a status code 200', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(res => {
          expect(res.body[0].comments).to.equal(2);
          expect(res.body[1].comments).to.equal(2);
          expect(res.body[2].comments).to.equal(2);
          expect(res.body[3].comments).to.equal(2);
        });
    });
    it('GET responds with a 404 for an invalid route', () => {
      return request
        .get('/api/article')
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal('Page Not Found....!');
        });
    });
  });
  describe('/api/articles/:article_id', () => {
    it('GET returns the correct article when searched for by id and gives a statusccode 200', () => {
      return request
        .get(`/api/articles/${articles[0]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.article.title).to.equal(articles[0].title);
        });
    });
    it('GET returns a comment count for a successfull get on the searched for id and gives a status code 200', () => {
      return request
        .get(`/api/articles/${articles[0]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.article.commentCount).to.equal(2);
        });
    });
    it('GET returns a 404 error code for a vaild format id but that id does not exist in database', () => {
      return request
        .get('/api/articles/5b9925e956599b430f57bec0')
        .expect(404)
        .then(res => {
          //console.log(res);
          expect(res.body.msg).to.equal('ID Not Found');
        });
    });
    it('GET returns a 400 error code for a invaild mongo id', () => {
      return request
        .get('/api/articles/abc')
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal(
            'Cast to ObjectId failed for value "abc" at path "belongs_to" for model "comments"'
          );
        });
    });
    it('PATCH returns a status code 200 and increments the vote count of the article searched for by id by one', () => {
      return request
        .patch(`/api/articles/${articles[0]._id}?vote=up`)
        .expect(200)
        .then(res => {
          expect(res.body.article.votes).to.equal(1);
        });
    });
    it('PATCH returns a status code 200 and decrements the vote count of the article searched for by id by one', () => {
      return request
        .patch(`/api/articles/${articles[0]._id}?vote=down`)
        .expect(200)
        .then(res => {
          expect(res.body.article.votes).to.equal(-1);
        });
    });
    it('PATCH returns a status code 200 and does not change the vote count of the article searched for by id if an invalid vote param is entered', () => {
      return request
        .patch(`/api/articles/${articles[0]._id}?vote=do`)
        .expect(200)
        .then(res => {
          expect(res.body.article.votes).to.equal(0);
        });
    });
    it('PATCH returns a status code 404 when an atempt to vote on an article when the id is valid but it does not exist in the database', () => {
      return request
        .patch('/api/articles/5b9925e956599b430f57bec0?vote=up')
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal('Article Not Found');
        });
    });
    it('PATCH returns a status code 404 when an atempt to vote on an article when the id is valid but it does not exist in the database', () => {
      return request
        .patch('/api/articles/abc?vote=up')
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal(
            'Cast to ObjectId failed for value "abc" at path "_id" for model "articles"'
          );
        });
    });
  });
  describe('/api/articles/:article_id/comments', () => {
    it('GET returns all comments for an article searched for by Id', () => {
      return request
        .get(`/api/articles/${articles[0]._id}/comments`)
        .expect(200)
        .then(res => {
          //console.log(res);
          expect(res.body.comments.length).to.equal(2);
        });
    });
    it('GET returns a 400 status code for an invaild id', () => {
      return request
        .get('/api/articles/abc/comments')
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal(
            'Cast to ObjectId failed for value "abc" at path "_id" for model "articles"'
          );
        });
    });
    it('GET returns a 404 error code for a valid formatted id but the id does not exist in database', () => {
      return request
        .get('/api/articles/5b9925e956599b430f57bec0/comments')
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal('Article Not Found');
        });
    });
    it('POST adds a new comment with the correct fields to the correct article as defined by the id and responds with a 201 status code', () => {
      return request
        .post(`/api/articles/${articles[0]._id}/comments`)
        .send({
          body: 'Test comment',
          created_by: mongoose.Types.ObjectId()
        })
        .expect(201)
        .then(res => {
          expect(res.body.comment).to.contain.keys(
            'votes',
            '_id',
            'body',
            'created_by',
            'belongs_to',
            'created_at',
            '__v'
          );
          expect(res.body.comment.body).to.equal('Test comment');
        });
    });
    it('POST gives a validation error and an error status code 400 for a comment with invalid key names', () => {
      return request
        .post(`/api/articles/${articles[0]._id}/comments`)
        .send({ bod: 'Test comment', created_by: mongoose.Types.ObjectId() })
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal(
            'comments validation failed: body: Path `body` is required.'
          );
        });
    });
    it('POST gives a validation error and an error status code 400 for a post with missing required field', () => {
      return request
        .post(`/api/articles/${articles[0]._id}/comments`)
        .send({ body: '', created_by: mongoose.Types.ObjectId() })
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal(
            'comments validation failed: body: Path `body` is required.'
          );
        });
    });
    it('POST gives a validation error and an error status code 400 for a post with an invaild mongoId', () => {
      return request
        .post(`/api/articles/${articles[0]._id}/comments`)
        .send({ body: 'Test comment', created_by: '12345' })
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal(
            'comments validation failed: created_by: Cast to ObjectID failed for value "12345" at path "created_by"'
          );
        });
    });
    it('POST gives a 400 status code for a valid comment posting to a non-mongoid article', () => {
      return request
        .post('/api/articles/abc/comments')
        .send({
          body: 'Test comment',
          created_by: mongoose.Types.ObjectId()
        })
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal(
            'Cast to ObjectId failed for value "abc" at path "_id" for model "articles"'
          );
        });
    });
    it('POST gives a 404 status code for a valid comment posting to a correct format mongoId but that Id does not match an article', () => {
      return request
        .post('/api/articles/5b9925e956599b430f57bec0/comments')
        .send({ body: 'Test comment', created_by: mongoose.Types.ObjectId() })
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal('Article  Not Found');
        });
    });
  });
  describe('/api/comments/:comment_id', () => {
    it('PATCH returns a status code 200 and increments the vote count of the comment searched for by id by one', () => {
      return request
        .patch(`/api/comments/${comments[0]._id}?vote=up`)
        .expect(200)
        .then(res => {
          expect(res.body.comment.votes).to.equal(8);
        });
    });
    it('PATCH returns a status code 200 and decrements the vote count of the comment searched for by id by one', () => {
      return request
        .patch(`/api/comments/${comments[0]._id}?vote=down`)
        .expect(200)
        .then(res => {
          expect(res.body.comment.votes).to.equal(6);
        });
    });
    it('PATCH returns a status code 200 and does not change the vote count of the comment searched for by id if an invalid vote param is entered', () => {
      return request
        .patch(`/api/comments/${comments[0]._id}?vote=do`)
        .expect(200)
        .then(res => {
          expect(res.body.comment.votes).to.equal(7);
        });
    });
    it('PATCH returns a status code 404 when an atempt to vote on a comment when the id is valid but it does not exist in the database', () => {
      return request
        .patch('/api/comments/5b9925e956599b430f57bec0?vote=up')
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal('Comment Not Found');
        });
    });
    it('PATCH returns a status code 404 when an atempt to vote on a comment when the id is valid but it does not exist in the database', () => {
      return request
        .patch('/api/comments/abc?vote=up')
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal(
            'Cast to ObjectId failed for value "abc" at path "_id" for model "comments"'
          );
        });
    });
    it('DELETE deletes a comment searched for by valid id and returns a status code 200', () => {
      return request
        .delete(`/api/comments/${comments[0]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.message).to.equal('Comment Removed Successfully');
          expect(res.body.comment).to.contain.keys(
            'votes',
            '_id',
            'body',
            'created_by',
            'belongs_to',
            'created_at',
            '__v'
          );
        });
    });
    it('DELETE responds with a 404 error code if the comment id is formatted correctly but it does not exist in the database', () => {
      return request
        .delete('/api/comments/5b9925e956599b430f57bec0')
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal('Comment Not Found');
        });
    });
    it('DELETE responds with a 400 error code for an invalid id', () => {
      return request
        .delete('/api/comments/abc')
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.equal(
            'Cast to ObjectId failed for value "abc" at path "_id" for model "comments"'
          );
        });
    });
  });
  describe('/api/users/:username', () => {
    it('GET returns a JSON object containing the profile data for the user searched for by username', () => {
      return request
        .get('/api/users/dedekind561')
        .expect(200)
        .then(res => {
          expect(res.body.user).to.contain.keys(
            '_id',
            'username',
            'name',
            'avatar_url'
          );
          expect(res.body.user.name).to.equal('mitch');
        });
    });
    it('GET returns error code 404 for a valid username not in the database', () => {
      return request
        .get('/api/users/abc')
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal('User Not Found');
        });
    });
  });
});
