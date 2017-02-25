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
