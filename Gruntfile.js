module.exports = function(grunt){
  [
    'grunt-cafe-mocha',
    'grunt-contrib-jshint',
    'grunt-exec',
  ].forEach(function(task);
)};
grunt.initConfig({
  cafemocha:{
    all:{src:'qa/tests-*.js',options:{ui:'tdd'},}
  },
  jshint:{
    app:['journey.js','public/js/**/*.js',
  'lib/**/*.js'],
  qa:['Gruntfile.js','public/qa/**/*.js','qa/**/*j.js'],
},
exec:{
  linkchecker:
  { cmd:'linkchecker http://locahost:10117'}
},
});
grunt.registerTask('default',['cafemocha','jshint','exec']);
