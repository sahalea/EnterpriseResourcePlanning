'use strict';

module.exports = function (grunt) {
	
  require('load-grunt-tasks')(grunt);

  require('time-grunt')(grunt);

  var appConfig = {
    app:  'app',
    dist: 'dist'
  };

  grunt.initConfig({
	
	watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '*.html',
          'app/**/*.js'
        ]
      }
    },
  	connect: {    
      options: {
        port: 9000,
        hostname: 'localhost',
        livereload: 35729
      },   
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.')
            ];
          }
        }
      }
    }

  });

  grunt.registerTask('default', '', function (target) {
    
    grunt.task.run([
      'connect:livereload',
      'watch'
    ]);

  });


};