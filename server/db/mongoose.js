
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('debug',true);
mongoose.connect('mongodb://13.127.217.153:27017/test');
module.exports = {mongoose};