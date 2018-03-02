
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('debug',true);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/User');


module.exports = {mongoose};