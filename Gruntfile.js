module.exports = function(grunt)
{
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        shell: {// Task
            publish: {// Target
                options: {// Options
                    stdout: true
                },
                command: 'app/console assets:install'
            },
            phpcs: {
                command: 'php-cs-fixer fix src/Stikair/',
                options: {
                    stdout: true
                }
            }
        },
        sass: {
            dist: {
                files: [{
                        expand: true,
                        cwd: 'web/',
                        src: ['**/*.scss'],
                        rename: function(a, b, c) {
                            var path = b.split("/");
                            var file = path[path.length - 1];
                            path[path.length - 1] = a;
                            path.push(file);
                            path = path.join('/');
                            return 'web/' + path;
                        },
                        dest: '../css',
                        ext: '.css'
                    }]
            }
        },
        watch: {
            php: {
                files: ["src/Stikair/**/*.php"],
                tasks: ["shell:phpcs"],
                options:{
                    spawn: false,
                    livereload: true,
                    interval: 2000
                }
            },
            //On change on scss files in bundles, publish them and compile them
            cssbundles: {
                files: ["src/**/*.scss"],
                tasks: ['shell:publish', 'sass'],
                options:{
                    interval: 2000
                }
            },
            //On change on js in bundles, publish them
            jsbundles: {
                files: ["src/**/*.js"],
                tasks: ['shell:publish'],
                options:{
                    interval: 2000
                }
            },
            //On change of css, livereload, maybe later concat and minify the whole thing
            css: {
                files: ["web/**/*.css"],
                options: {
                    spawn: false,
                    livereload: true,
                    interval: 2000
                }
            },
            //On change of js files, maybe later concat, jslint and minify the stuff. For now livereloading
            js: {
                files: ["web/**/*.js"],
                option: {
                    spawn: false,
                    livereload: true,
                    interval: 2000
                }
            }
        }
    });
}
