var path = require('path');
var nconf = require('nconf');

nconf
.argv()
.env()
.file({
  file: path.join(__dirname, 'config.json')
});

nconf.defaults({
  redis: {
    host: '127.0.0.1',
    port: 6379,
    pass: ''
  },
  port: 8080,
  addr: '0.0.0.0'
});

module.exports = nconf;
