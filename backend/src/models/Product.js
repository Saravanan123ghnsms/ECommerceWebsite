const mongoose = require("mongoose");
const Category = require("./Category");
const { ref } = require("process");
const {Schema} = mongoose;


const ProductSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    } ,
    price :{
        type : Number,
        required : true,
    },
    stock : {
        type : Number,
        default : 0,
        required : true
    },
    imageUrl : {
        type : String,
        default : "",
        required : true
    },
    category :{
        type : Schema.Types.ObjectId,
        ref:"Category",
        required : true
    }
},{timestamps : true});

const Product = mongoose.model("Product",ProductSchema);
module.exports = Product