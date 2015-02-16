var express = require('express')
  , nunjucks = require('nunjucks')
  , routerAsync = require('./router')
;

/**
 * Returns the express app instance in a callback that can be used to start
 * http(s) server(s).
 *
 * All callback functions take in a completion function as the last parameter.
 * These signature of these functions is one with no parameters and a void
 * return type.
 *
 * @param function configCallback Optional callback function used to configure
 *   the express app instance. Takes in the express app instance as the first
 *   paramter, and a completion function as the second paramter.
 *
 * @param function startCallback Optional callback function used to be notified
 *   of when the server is ready. Takes in the created server instance as the
 *   first paramter, and a completion function as the second parameter.
 */
function setupApp(configCallback, startCallback) {
  routerAsync(function(router) {
    // initialize express
    var app = express();

    // use nunjucks to process view templates in express
    nunjucks.configure('server/templates/views', {
      express: app
    });

    // Set default config callback that does nothing and continues
    if (!configCallback) {
      configCallback = function(app, callback) {
        callback();
      }
    }

    configCallback(app, function() {
      // use top-level app router
      app.use(router);

      if (startCallback) {
        startCallback(app);
      }
    });
  });
}

module.exports = setupApp;
