var	nMemcached = require('memcached');
var http = require('http');

// connect to our memcached server on host 10.211.55.5, port 11211
memcached = new nMemcached(process.env.MEMCACHED__HOST || '10.211.55.5' + ":11211");

var requestListener = function (req, res) {

  memcached.set("hello", "world", 1000, function(err, ok){

    if( err ) console.error( err );
    //console.info (this);
    console.info ("set hello");

    memcached.get("hello", function(err, answer){

      if( err ) console.error( err );

      console.info ("got " + answer);
      //console.info (this);

      res.writeHead(200);
      res.end('Hello, World!\n');
    });
  });
}

var server = http.createServer(requestListener);
server.listen(22122);
