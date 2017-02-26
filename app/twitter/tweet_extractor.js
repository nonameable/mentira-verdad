var Twit = require('twit');
var config = require('./config'); // this is the local config with

// Include the async package
// Make sure you add "async" to your package.json
async = require("async");

//module for trasforming names of polis
transform  = require('./userTransformation');

// list of all users to follow
var users = require('./users').users;

var T = new Twit(config);

// / var that will contain all the tweets from the users
var allTweets = [];


// this functions gets the text from the tweets from all of the users to follow
function getTweetsFromTwitter(){

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
      console.log('tweets have been extracted and are now in allTweets array');
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
	T.get('search/tweets', { q: 'from:' + user, count: 1, result_type: 'popular' }, function(err, data, response) {
	  var tweetsData = data.statuses;
	  console.log("the number of tweets from user " + user + " is " + tweetsData.length);
	  for (var i = 0; i < tweetsData.length; i++) {
	  	var tweet = {user: user,  text: tweetsData[i].text};
	  	allTweets.push(tweet);
	  }
	  callback();
	})
}


// prints all tweets in allTweets
function printAllTweets(){
	console.log("all tweets length " + allTweets.length);
	for (var i = 0; i < allTweets.length; i++) {
		console.log(allTweets[i]);
	}
}

module.exports.getTweetsFromTwitter;
module.exports.allTweets;
