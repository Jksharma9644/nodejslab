
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('debug',true);
mongoose.connect('mongodb://13.127.233.100:27017/test');
module.exports = {mongoose};