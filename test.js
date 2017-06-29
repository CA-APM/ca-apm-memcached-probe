var	nMemcached = require('memcached');

// connect to our memcached server on host 10.211.55.5, port 11211
memcached = new nMemcached(["localhost:11211", "localhost:11212"] );


for (var i = 0; i < 10; ++i) {

    setTimeout(function(){
        memcached.set("hello", "world", 1000, function(err, ok){

          if( err ) console.error( err );
          //console.info (this);
          console.info ("set hello");

          memcached.get("hello", function(err, answer){

            if( err ) console.error( err );

            console.info ("got " + answer);
            //console.info (this);
            memcached.end(); // as we are 100% certain we are not going to use the connection again, we are going to end it

          });
        });
    }, 10000 * i);

}
