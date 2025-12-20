
const  mongoose  = require("mongoose");
const {Schema} = mongoose;

const CategorySchema =  new Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    description : {
         type : String,
         default : 'Upgrade your world with the newest mobiles and gadgets.Power, style, and performance — all in your hands.',
         trim : true
    },
    imageUrl : {
        type : String,
        default : ""
    }

},{timestamps : true});

module.exports = mongoose.model("Category",CategorySchema);
