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
    db.collection('logs').find().toArray(function(err, result){
    if(err) return 'Error in database'
    res.send(result);
  });

});

// write a function that saves the most popular tweet to the databese



 module.exports = router;
 // export the function created above
