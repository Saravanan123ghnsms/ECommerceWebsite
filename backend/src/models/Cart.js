const { timeStamp } = require("console");
const mongoose = require("mongoose");

const Schema = mongoose;


const CartSchema = new Schema({
      user :{
        type : Schema.Types.ObjectId,
        ref : "users",
        required :true
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
                 required : true,
                 default : 1
            }
        }
      ],
      totalPrice : {
        type : Number,
        default : 0
      }
}, { timestamps: true });

module.exports = mongoose.model("Cart",CartSchema)