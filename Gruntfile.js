'use strict';
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-stylus');

  grunt.initConfig({
    babel: {
      dist: {
        files: {
          //compile to: compile from
          // "main.js": "app/main.js"
        }
      }
    },
    stylus: {
      compile: {
        files: {
          // compile to: compile from
          'app/css/style.css': 'app/css/style.styl'
        }
      }
    },
    watch: {
      babel: {
        files: ['./app/**.js', '!**/node_modules/**'],
        tasks: ['babel'],
        options: {
          livereload: true
        }
      },
      stylus: {
        files: ['**/*.styl', '!**/node_modules/**'],
        tasks: ['stylus'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('compile', ['babel', 'stylus']);
};
