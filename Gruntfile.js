module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dist: {
        options: {
          browserifyOptions: {
            debug: true,
            standalone: 'p5js-threejs-webxr',
          },
        },
        files: {
          'libs/<%= pkg.name %>.js': ['src/app.js'],
        },
      },
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'libs/<%= pkg.name %>.js',
      },
    },
    uglify: {
      options: {
        banner:
          '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
      },
      dist: {
        files: {
          'libs/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>'],
        },
      },
    },
    watch: {
      files: ['src/**/*.js'],
      tasks: ['concat', 'uglify'],
    },
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['browserify', 'uglify']);
};
