module.exports=function(grunt)
{
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    watch:{
      css:{
        files: ["**/*.css"],
        options:{
          spawn: false,
          livereload: true
        }
      },
      js:{
        files:["**/*.js"],
        option:{
          spawn:false,
          livereload: true
        }
      }
    }
  });
}
