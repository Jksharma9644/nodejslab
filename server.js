'use strict';

// require('./server/config/config');
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./api/models/userModel'),
  Products = require('./api/models/productModel'),
  Admin = require('./api/models/adminModel'),
  Token= require('./api/models/tokeModal'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  jsonwebToken= require('jsonwebtoken');
  var userHandler = require('./api/controllers/userController.js');
  var productHandler = require('./api/controllers/productController.js');

  // app config 
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());  

 app.use(function(req,res,next){
    if(req.headers && req.headers.authorization && req.headers.authorization.split('')[0]=='jwt'){
        jsonwebToken.verify(req.headers.authorization.split(' ')[1],'RESTFULAPIs',function(err,decode){
            if(err)  req.user = undefined;
            req.user = decode;
            next()
        });
    }else{
        req.user= undefined;
        next();
    }
 });






// route files
app.route('/auth/register')
    .post(userHandler.sign_up);
app.route('/auth/sign_in')
    .post(userHandler.sign_in);
app.route('/auth/confirmation')
    .post(userHandler.confirmationPost);
app.route('/auth/resend')
    .post(userHandler.resend);


//admin login

app.route('/auth/admin/regitser')
    .post(userHandler.adminSignup);
app.route('/auth/admin/sign_in')
    .post(userHandler.adminSignin);

    
// route files
app.route('/product/list')
    .get(productHandler.productList);

// app.route('/product/:id')
//    .get(userHandler.register);
app.route('/product/add')
    .post(productHandler.AddProduct);

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});


var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port);
});
// console.log('todo list RESTful API server started on: ' + port);

module.exports = app;