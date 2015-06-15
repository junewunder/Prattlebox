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
          //there's no need for babel right now
        }
      }
    },
    stylus: {
      compile: {
        files: {
          // compile to: compile from
          'app/render/css/style.css': 'app/render/css/style.styl'
        }
      }
    },
    watch: {
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
  grunt.registerTask('compile', ['stylus']);
};
