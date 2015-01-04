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
      configFiles: {
        files: [ 'Gruntfile.js', 'config/*.js' ],
        options: {
          reload: true
        }
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
      browserify: {
        files: ['client/scripts/index.js'],
        tasks: [],
      },
      concat: {
        files: ['public/js/client.js'],
        tasks: ['concat'],
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
      vendor: {
        src: [],
        dest: 'public/js/vendor.js',
        options: {
          transform: ['reactify'],
          require: [
            'react',
            'react-bootstrap'
          ],
        },
      },
      client: {
        src: ['client/scripts/index.js'],
        dest: 'public/js/client.js',
        options: {
          transform: ['reactify'],
          external: ['react', 'react-bootstrap'],
          watch: true,
        },
      },
    },
    concat: {
      'public/js/index.js': ['public/js/vendor.js', 'public/js/client.js']
    },
  });

  grunt.event.on('watch', function(action, filepath) {
    grunt.config('jshint.all.src', filepath);
  });

  grunt.registerTask('serve', [
    'browserify:vendor',
    'browserify:client',
    'express:dev',
    'open',
    'watch',
  ]);

  //Default task needs to be defined, but for now, it does the same thing as grunt serve.
  grunt.registerTask('default', ['serve']);
};


module.exports = grunt;
