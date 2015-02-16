var setupApp = require('./server/app.js');

setupApp(null, function(app) {
  // start an http server
  var server = app.listen(process.env.PORT || 3000, function() {
    console.log('\nServer ready on port %d\n', server.address().port);
  });
});

