
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('debug',true);
mongoose.connect('mongodb://52.66.180.44:27017/test');
module.exports = {mongoose};