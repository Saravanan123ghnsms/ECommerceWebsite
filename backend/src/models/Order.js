const mongoose = require("mongoose");
const {Schema} = mongoose;


const OrderSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref :"users",
        required : true
    },
    items : [
        {
            product : {
                type : Schema.Types.ObjectId,
                ref : "Product",
                required : true
            },
            quantity : {
                type : Number,
                default : 0

            }
        }
    ],
    totalAmount : {
        type : Number
    },
    paymentStatus : {
        type : String,
        enum : ["Pending","Paid"],
        default : "Pending"
    },
    orderStatus : {
        type : String,
        enum : ["Placed","Shipped","Delivered"],
        default : "Placed"
    },
    address : {
        type : String
    }
     
},{timestamps : true});

module.exports = mongoose.model("Orders",OrderSchema);