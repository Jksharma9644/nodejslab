'use strict';
// var mongoose = require('mongoose'),
var {mongoose} = require('../../server/db/mongoose'),
    jsonwebToken = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    Products = mongoose.model('Products'),
    Record_count;
    


/*------------Save new Product -----*/
exports.AddProduct = function(req,res){
    //  console.log(req.body);
   var db = new Products();
   var response ={};
   db.product_id = Record_count;
   db.images=req.body.images;
   db.product_type = req.body.product_type;
   db.product_name = req.body.product_name;
   db.product_price = req.body.product_price;
   db.description = req.body.description;
   db.default_qty = req.body.default_qty;
   db.is_active = req.body.is_active;
   db.is_deleted = req.body.is_deleted;
   db.created_by_id = req.body.created_by_id;
   db.created_date = req.body.created_date;
   db.updated_by_id = req.body.updated_by_id;
   db.updated_date = req.body.updated_date;

   db.save(function(err,data){
       if(err){
        console.log(err);
        response = { "error": true, "message": err };
       }else{
        response = { "error": false, "message": "Data added for ID :" + data._id ," Product Id ": data.product_id };
       }
       res.json(response);
   })
}

exports.productList =function (req, res) {
    var response = {error:"test message`"};
    // Products.find({is_deleted:false},function (err, data) {
    //     // Mongo command to fetch all data from collection.
    //     if (err) {
    //         response = { "error": true, "message": err };
    //     } else {
    //         response = { "error": false, "message": "success" ,"data": data };
    //     }
        res.json(response);
    // });
}
