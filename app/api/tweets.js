var express = require('express');
var router  = express.Router();
var path = require('path');
// I need an instance of db in this file, so I can call it when I need to add something
var server = require('../../bot');
var db;

// middleware that is specific to this router

router.use(function timeLog(req, res, next) {
  console.log('entering tweets');
  db = server.database;
  next();
});


// define the home page route
// it also sends the tweets saved in the database
router.get('/', function(req, res) {
    db.collection('tweets').find().toArray(function(err, result){
    if(err) return 'Error in database'
    res.send(result);
  });

});


router.post('/vote',  function(req, res){
  var vote = req.body;
  if (vote.class === 'upvote'){
    // increase upvote counter in database for that tweet
    db.collection('tweets').update(
      {_id: vote._id },
      {$inc: { upvotes: 1 }},
      function(err, result) {
        if(err) res.send('Error saving upvote');
        res.send('upvote saved!');
      }
    )
  }
  else if (vote.class === 'downvote'){
    // increase downvote counter in database for that tweet
    db.collection('tweets').update(
      {_id: vote._id },
      {$inc: { downvotes: 1 }},
      function(err, result){
        if(err) res.send('Error saving downvote');
        res.send('downvote saved!');
      }
    )
  }
  else {
    // leave else clause in case we want to extend classes of votes
  }
});

function getMorePopularTweet(){
  db.collection('tweets').find().toArray(function(err, result){
  if(err) return 'Error in database'
  var more_popular_tweet = result[0];
  var popularityBar = more_popular_tweet.upvotes + more_popular_tweet.downvotes;
  for (var i = 1; i < result.length; i++) {
    if((result[i].upvotes + result[i].downvotes) > popularityBar){
      more_popular_tweet = result[i];
      popularityBar = result[i].upvotes + result[i].downvotes;
    }
  }
  return more_popular_tweet;
  });
}

 module.exports = router;
 module.exports = getMorePopularTweet;
