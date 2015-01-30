var express = require('express')
  , nunjucks = require('nunjucks')
  , routerAsync = require('./server/router')
;

routerAsync(function(router) {
  // initialize express
  var app = express();

  // use nunjucks to process view templates in express
  nunjucks.configure('server/templates/views', {
    express: app
  });

  // use top-level app router
  app.use(router);

  // start the server
  var server = app.listen(process.env.PORT || 3000, function() {
    console.log('\nServer ready on port %d\n', server.address().port);
  });
});
