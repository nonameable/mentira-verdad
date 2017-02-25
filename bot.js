// load the express package and load our app
var express = require('express');
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var db;

//APP CONFIGURATION
var config = require('./config');

// API routes
var apiRoutes= require('./app/api');

app.use('/api', apiRoutes);

// set the public folder to serve public assets
app.use(express.static(__dirname + '/public'));


// send our index.html file to the user for the home page
app.get('/', function(req, res) {
res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


// Database connection
MongoClient.connect(config.database, (err, database) => {

  if (err) return console.log(err)
  db = database;
	console.log('Good connection');
  module.exports.database = db;
  app.listen(config.port, () => {
    console.log('listening on 1337')
  })
});







// bot that queries Twitter API
