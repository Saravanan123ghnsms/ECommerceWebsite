const mongoose = require("mongoose");
const {Schema} = mongoose;

const ReviewSchema = new Schema({
     product : {
        type : Schema.Types.ObjectId,
        ref : "Product",
        required : true
     },

     user : {
        type : Schema.Types.ObjectId,
        ref : "users",
        required : true
     },
     rating : {
        type : Number,
        min: 1,
        max : 5
     },
     comment : {
        type : String
     }
 
},{timestamps : true});




module.exports = mongoose.model("Review",ReviewSchema);