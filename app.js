/**
 * Created by luodan on 2015/8/4 0004.
 */

//var express = require('express');
//var app = express();
//
//app.set('view engine', 'jade');
//app.set('port', 3000);
//
//app.get('/', function(req, res) {
//    res.render('index', {title: 'movie'});
//});

//入口文件
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var _ = require('underscore');
var Movie = require('./models/movie');
var port = process.env.PORT || 3000;
var app = express();

//连接数据库
mongoose.connect('mongodb://localhost/movie');

app.set('views', './views/pages');
app.set('view engine', 'jade');
//（提交表单）数据格式化
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
app.listen(port);

//console.log('movie started on port ' + port);

//路由编写
//index page
app.get('/', function(req, res) {
    Movie.fetch(function(err, movies) {
        if(err) {
            console.log(err);
        }

        res.render('index', {
            title: 'movie 首页',
            movies: movies
        });
    });
});

//detail page
app.get('/movie/:id', function(req, res) {
    var id = req.params.id;

    Movie.findById(id, function(err, movie) {
        res.render('detail', {
            title: 'movie ' + movie.title,
            movie: movie
        });
    });

});

//admin page
app.get('/admin/movie', function(req, res) {
    res.render('admin', {
        title: 'movie 后台录入页',
        movie: {
            doctor: '',
            country: '',
            title: '',
            year: '',
            poster: '',
            language: '',
            flash: '',
            summary: ''
        }
    });
});

// admin update movie
app.get('/admin/update/:id', function(req, res) {
    var id = rea.params.id;

    if (id) {
        Movie.findById(id, function(err, movie) {
            res.render('admin', {
                title: 'movie 后台更新页',
                movie: movie
            })
        })
    }
})

// admin post movie
app.post('/admin/movie/new', function(req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;

    if(id !== 'undefined') {
        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err)
            }

            _movie = _.extend(movie, movieObj);
            _movie.save(function(err, movie) {
                if (err) {
                    console.log(err);
                }

                //如果存入成功，则重定向到详情页面
                res.redirect('/movie/' + movie._id);
            })
        })
    } else {
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        });

        _movie.save(function(err, movie) {
            if (err) {
                console.log(err);
            }

            res.redirect('/movie/' + movie._id);
        });
    }
});

//list page
app.get('/admin/list/', function(req, res) {
    Movie.fetch(function(err, movies) {
        if(err) {
            console.log(err);
        }

        res.render('list', {
            title: 'movie 列表页',
            movies: movies
        });
    });

});

// list delete movie
app.delete('/admin/list', function(req, res) {
    var id = req.query.id;

    if (id) {
        Movie.remove({_id: id}, function(err, movie) {
            if (err) {
                console.log(err)
            } else {
                res.json({success: 1})
            }
        })
    }
});



