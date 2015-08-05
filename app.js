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
var port = process.env.PORT || 3000;
var app = express();

app.set('views', './views/pages');
app.set('view engine', 'jade');
//（提交表单）数据格式化
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'bower_components')));
app.listen(port);

console.log('movie started on port ' + port);

//路由编写
//伪造数据
//index page
app.get('/', function(req, res) {
    res.render('index', {
        title: 'movie 首页',
        movies: [{
            title: '机械战警',
            _id: 1,
            poster: 'http://i3.tietuku.com/bef1192c125652a9.png'
        },{
            title: '机械战警',
            _id: 2,
            poster: 'http://i3.tietuku.com/bef1192c125652a9.png'
        },{
            title: '机械战警',
            _id: 3,
            poster: 'http://i3.tietuku.com/bef1192c125652a9.png'
        },{
            title: '机械战警',
            _id: 4,
            poster: 'http://i3.tietuku.com/bef1192c125652a9.png'
        },{
            title: '机械战警',
            _id: 5,
            poster: 'http://i3.tietuku.com/bef1192c125652a9.png'
        },{
            title: '机械战警',
            _id: 6,
            poster: 'http://i3.tietuku.com/bef1192c125652a9.png'
        },{
            title: '机械战警',
            _id: 7,
            poster: 'http://i3.tietuku.com/bef1192c125652a9.png'
        }]
    });
});

//detail page
app.get('/movie/:id', function(req, res) {
    res.render('detail', {
        title: 'movie 详情页',
        movie: {
            doctor: '何塞·帕迪里亚',
            country: '美国',
            title: '机械战警',
            year: 2014,
            poster: '',
            language: '英语',
            flash: 'http://player.youku.com/player.php/sid/XNJA1Njc0NTUy/v.swf',
            summary: '《机械战警》是由何塞· 迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德' +
            '曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在' +
            '美国上映，2014年2月28日在中国大陆上映。影片的故事背景与原版基本相同，故事设定在2028年的' +
            '底特律，男主角亚历克斯·墨菲是一名正直的警察，被坏人安装在车上的炸弹炸成重伤，为了救他，' +
            'OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来'
        }
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

//list page
app.get('/admin/list/', function(req, res) {
    res.render('list', {
        title: 'movie 列表页',
        movies: [{
            doctor: '何塞·帕迪里亚',
            country: '美国',
            title: '机械战警',
            id: 1,
            year: 2014,
            poster: 'http://r3.ykimg.com.05160000530EEB63675839160D0B79D5',
            language: '英语',
            flash: 'http://player.youku.com/player.php/sid/XNJA1Njc0NTUy/v.swf'
        }]
    });
});





