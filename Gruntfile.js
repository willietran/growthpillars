var grunt = function(grunt) {
  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  var serverJSFiles = [
    'server.js',
    'server/*.js'
  ];

  var port = 3000;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: serverJSFiles,
        tasks: 'jshint',
        options: {
          spawn: true,
        },
      },
      templates: {
        files: ['server/templates/views/*.html'],
        tasks: [],
        options: {
          spawn: false,
        },
      },
      express: {
        files: serverJSFiles,
        tasks: 'express:dev', // No watching in prod
        options: {
          spawn: false,
        },
      },
    },
    jshint: {
      options: {
        laxcomma: true,
      },
      all: {
        src: serverJSFiles,
      },
    },
    open: {
      dev: {
        path: 'http://127.0.0.1:' + port.toString(),
      },
    },
    express: {
      options: {
        script: './server.js',
        livereload: true,
        port: 3000,
        output: 'Server ready on port \\d+'
      },
      dev: {
        node_env: 'development',
      },
      prod: {
        node_env: 'production',
      },
    },
    browserify: {
      dev: {
        files: {
          'public/js/index.js': [
            'client/scripts/index.js'
          ],
        },
        options: {
          transform: ['reactify'],
          require: [
            'react'
          ],
          watch: true,
        },
      }
    },
  });

  grunt.event.on('watch', function(action, filepath) {
    grunt.config('jshint.all.src', filepath);
  });

  grunt.registerTask('serve', [
    'browserify:dev',
    'express:dev',
    'open',
    'watch:express',
    'watch:jshint'
  ]);

  //Default task needs to be defined, but for now, it does the same thing as grunt serve.
  grunt.registerTask('default', [
    'express:dev',
    'open',
    'watch:express',
    'watch:jshint'
  ]);
};


module.exports = grunt;
