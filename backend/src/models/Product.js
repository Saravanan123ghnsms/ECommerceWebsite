const mongoose = require("mongoose");
const Category = require("./Category");
const { ref } = require("process");
const {Schema} = mongoose;


const ProductSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String,
        required : true
    } ,
    originalPrice :{
        type : Number,
        required : true,
    },
    finalPrice :{
        type : Number,
        required : true,
    },
    discount :{
        type : Number,
        required : true,
    },
    stock : {
        type : Schema.Types.ObjectId,
        ref : "Inventory",
        required : true
        
    },
    imageUrl : {
        type : String,
        required : true
    },
    category :{
        type : Schema.Types.ObjectId,
        ref:"Category",
        required : true
    },
    updatedBy : {
        type : Schema.Types.ObjectId,
        ref : "users",
        required : true
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : "users",
        required : true
    }
},{timestamps : true});

const Product = mongoose.model("Product",ProductSchema);
module.exports = Product