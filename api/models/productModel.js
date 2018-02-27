'use strict';
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;
const validator = require('validator');


var ProductsSchema= new mongoose.Schema({
    "product_id": Number,
    "images":[],
    "product_type": { type: Number},
    "product_name": { type: String },
    "product_price": { type: Number, min: 1 },
    "description": { type: String },
    "default_qty": { type: Number, min: 1 },
    "is_active": { type: Boolean, default: true },
    "is_deleted": { type: Boolean, default: false },
    "is_pending": { type: Boolean, default: false },
    "created_by_id":String,
    "created_date": { type: Date, default: Date.now },
    "updated_by_id": Number,
    "updated_date": { type: Date, default: Date.now }
})
mongoose.model('Products',ProductsSchema);