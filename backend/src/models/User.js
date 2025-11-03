const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    name : {
        type :String,
        required : [true,"Username is requried."],
        trim : true
    },
    mobileNumber : {
        type : String,
        required : false
    },
    email : {
        type : String,
    },
    address : {
        type : String
    },
    profileUrl : {
         type : String
    },
    role : {
        type : String,
        enum : ['customer','admin','seller'],
        default : 'customer'
    }
},{timestamps : true});

//compile the model...

const user = mongoose.model('users',UserSchema);

module.exports = user;


