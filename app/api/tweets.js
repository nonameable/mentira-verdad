var express = require('express');
var router  = express.Router();
var path = require('path');
// I need an instance of db in this file, so I can call it when I need to add something
var server = require('../../server');
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
  }
  else  if (vote.class === 'downvote'){
    // increase downvote counter in database for that tweet
  }
  else {
    // leave else clause in case we want to extend classes of votes
  }
});



 module.exports = router;
