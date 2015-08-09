/**
 * Created by luodan on 2015/8/6 0006.
 */
//模型
var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');
//生成模型，传入模型名字和模式名字
var Movie = mongoose.model('Movie', MovieSchema);

//将这个构造函数导出
module.exports = Movie;