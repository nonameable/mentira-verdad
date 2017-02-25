// load the express package and load our app
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var db;

//APP CONFIGURATION
var config = require('./config');

// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API routes
var apiRoutes= require('./app/api');
app.use('/api', apiRoutes);

// ADMIN routes
var admin = require('./app/admin/admin');
app.use('/admin', admin);

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



console.log('Bot has started');
var config = require('./config');
var Twit = require('twit');

// Include the async package
// Make sure you add "async" to your package.json
async = require("async");

//module for trasforming names of polis
transform  = require('./userTransformation');

// list of all users to follow
var users = require('./users').users;

var T = new Twit(config);

// var that will contain all the tweets from the users
var allTweets = [];



// missing code that sets the execution of this every hour or 30 min.







// this functions gets the text from the tweets from all of the users to follow
function getTweets(){

	cleanTweets();


	// 1st param in async.each() is the array of users
	async.each(users,
	  // 2nd param is the function that each item is passed to
	  function(user, callback){
	    // Call an asynchronous function, in this case, the one that consumes Twitter API
	    addPopularTweetsFromUser(user,function (){
	      // Async call is done, alert via callback
	      callback();
	    });
	  },
	  // 3rd param is the function to call when everything's done
	  function(err){
	    // All tasks are done now
	    tweetAllPolisTweets();
	    //printAllTweets();
	  }
	);

}


// functions that cleans the tweets array
function cleanTweets(){
	allTweets = [];
}

// adds the tweets from a particular user
function addPopularTweetsFromUser(user, callback){
	T.get('search/tweets', { q: 'from:' + user, count: 2, result_type: 'popular' }, function(err, data, response) {
	  var tweetsData = data.statuses;
	  console.log("the number of tweets from user " + user + " is " + tweetsData.length);
	  for (var i = 0; i < tweetsData.length; i++) {
	  	var tweet = {user: user,  text: tweetsData[i].text};
	  	allTweets.push(tweet);
	  }
	  callback();
	})
}

// tweets every tweet our lovely polis have tweeted



function tweetTheTweets(){
	var array
}

function tweetAllPolisTweets(){
	console.log("all tweets length " + allTweets.length);
	async.each(allTweets,
		function (tweet, callback) {
			postTweet(tweet, function(){
				callback();
			});
		},
		function(err){

		}
	);
}

function postTweet(tweet, callback){

	var tweetArray = produceTweetArray(tweet);
	for (var i = 0; i < tweetArray.length; i++) {
		T.post('statuses/update', { status: tweetArray[i] }, function(err, data, response) {
			  console.log("tweet # " + " by user " + tweet.user + " tweeted");

		});

	}
	callback();
}

// prints all tweets in allTweets
function printAllTweets(){
	console.log("all tweets length " + allTweets.length);
	for (var i = 0; i < allTweets.length; i++) {
		console.log(allTweets[i]);
	}
}


// returns an array of the tweets that compose an original tweet
function produceTweetArray(tweet){
	var tweetArray = [];
	var separator = ": ";
	var continuation = " CONT";
	var points = " ...";
	var newTweet = tweet.user + separator + tweet.text;
	if( newTweet.length > 140){
		tweetArray.push(newTweet.substring(0, (newTweet.length / 2)) + points);
		tweetArray.push(tweet.user  + continuation + separator + points + newTweet.substring(newTweet.length / 2, newTweet.length));

	}
	else{
		tweetArray.push(newTweet);
	}
	return tweetArray;

}

//execution

getTweets();
