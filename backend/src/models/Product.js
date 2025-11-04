const mongoose = require("mongoose");
const Category = require("./Category");
const { ref } = require("process");
const {Schema} = mongoose;


const ProductSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    description : String,
    price :{
        type : Number,
        required : true,
    },
    stock : {
        type : Number,
        default : 0
    },
    imageUrl : {
        type : String,
        default : ""
    },
    category :{
        type : Schema.Types.ObjectId,
        ref:"Category",
        required : true
    }
},{timestamps : true});


module.exports = mongoose.model("Product",ProductSchema);