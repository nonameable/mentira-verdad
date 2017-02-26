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

// we declare the tweet extractor taht will get the most popular tweets
var tweet_extractor = require('./app/twitter/tweet_extractor');


// Cron job that executes the update every day
var CronJob = require('cron').CronJob;
var job = new CronJob('00 30 11 * * 1-7', function() {
  /*
   * Runs every day (Monday through Sunday)
   * at 11:30:00 AM.
   */

	 // gets more popular one

	 // saves it to the popular_tweets collection

	 // clears tweets collection
	 db.collection('tweets').deleteMany({});
	 // gets tweets  (max 30)
	 tweet_extractor.getTweetsFromTwitter();
	 // there may be some sync problems here
	 var tweets_to_post = tweet_extractor.allTweets;
	 // saves tweets (max 30)
	 db.collection('tweets').insertMany(
		 tweets_to_post,
		 function(err, result){
			 assert.equal(null, err);
			 assert.equal(tweets_to_post.length(), result.insertedCount);
		 }
	 );

  }, function () {
    /* This function is executed when the job stops */
		console.log("Tweets updated");
		//saves log into database
		db.collection('update_logs').insert(
			{date: new Date()},
			function (err, result){
				assert.equal(null, err);
 			 assert.equal(1, result.insertedCount);
			}
		);

  },
  true, /* Start the job right now */
  'America/Los_Angeles' /* Time zone of this job. */
);





// bot that queries Twitter API
