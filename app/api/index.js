var express = require('express');
var config = require('../../config');

// create a new Router
var apiRouter = express.Router();

apiRouter.use (function(req, res, next){
  console.log('Somebody just came to our app!');
  next();
})

// test route to make sure everything is working
apiRouter.get('/', function(req, res) {
  res.json({
    message: 'Welcome to metira-verdad API.'
  });
});

// set subroutes on the other files
apiRouter.use('/tweets', require('./tweets'));

module.exports = apiRouter;
