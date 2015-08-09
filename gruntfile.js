/**
 * Created by luodan on 2015/8/8 0008.
 */
module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            jade: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
                //tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }
        },

        modemon: {
            dev: {
                options: {
                    file: 'app.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['app', 'config'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: dirname
                }
            }
        },

        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    //只要有文件的修改、增加、删除，就会重新执行在里面注册好的任务
    grunt.loadNpmTasks('grunt-contrib-watch');

    //用于实时监听，实时监听app.js文件，也就是人口文件
    grunt.loadNpmTasks('grunt-nodemon');

    //针对慢任务开发的插件，慢任务例如：Sass等
    grunt.loadNpmTasks('grunt-concurrent');

    //不因为语法错误，中断整个grunt服务
    grunt.option('force', true);

    //注册默认的任务
    grunt.registerTask('default', ['concurrent']);
}
