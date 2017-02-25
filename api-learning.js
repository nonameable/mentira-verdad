T.get('statuses/user_timeline', {screen_name : 'AlvaroUribeVel', count: 5}, function(err, data, response){
  var tweets = data;
  console.log(tweets.length);
  for (var i = 0; i < tweets.length; i++) {
  	console.log(tweets[i].text);
  } 
})

console.log('-----------------------------')

// returns 5 most recent tweets. If the user is not active or relevant for the community, it will return less or 0.
T.get('search/tweets', { q: 'from:AlvaroUribeVel', count: 5}, function(err, data, response) { 
  var tweets = data.statuses;
  console.log(tweets.length);
  for (var i = 0; i < tweets.length; i++) {
  	console.log('uuuu');
  	console.log(tweets[i].text);
  }
})

console.log(-------------------)
// returns more popular tweets
T.get('search/tweets', { q: 'from:AlvaroUribeVel', count: 5, result_type: 'popular' }, function(err, data, response) { 
  var tweets = data.statuses;
  console.log(tweets.length);
  for (var i = 0; i < tweets.length; i++) {
  	console.log('uuuu');
  	console.log(tweets[i].text);
  }
})

//
//  filter the twitter public stream by the word 'mango'.
//
//var stream = T.stream('statuses/filter', { track: 'AlvaroUribeVel' })

//stream.on('tweet', function (tweet) {
//  console.log(tweet)
//})


//
//  tweet 'hello world!'
//
//T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  //console.log(data)
//})

