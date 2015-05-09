var http = require('http');
var path = require('path');
var config = require(path.join(__dirname, 'config.js'));
var fs = require('fs');
var request = require('request');
var colors = require('colors');
var redisHost = config.get('redis:host');
var redisPort = config.get('redis:port');
var redisPass = config.get('redis:pass');
var redis = require('redis');
var client = redis.createClient(redisPort, redisHost, {
  auth_pass: redisPass
});

client.on('ready', function () {
  console.log("Redis connected.".bold.yellow);
});

var API_KEY = config.get('api:key');

http.createServer(function (req, res) {
  var query = req.url.substr(1).replace(/%20/g, '+');
  console.log('Searching for:'.bold.red,
  decodeURIComponent(query.replace(/\+/g, ' ')).bold.red);
  if (!query || query === 'none') {
    return res.end('You must specify a search.');
  }
  client.get(query, function(err, val) {
    if (val !== null) {
      console.log("Cached: ".bold.green + val.bold.green);
      return res.end(val);
    }
    var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=';
    url += query +'&key='+ API_KEY +'&type=video';
    request(url, function(err, resp, body) {
      var data = JSON.parse(body);
      var id = data.items[0].id.videoId || null;
      client.set(query, id);
      console.log(id.bold.green);
      res.end(id);
    });
  });
}).listen(config.get('port'), config.get('addr'));
console.log("Server started.".bold.yellow);
