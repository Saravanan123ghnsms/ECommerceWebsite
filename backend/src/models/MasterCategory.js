const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { ref } = require("process");
const {Schema} = mongoose;



const MasterCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    isActive : {
        type : Boolean,
        required: true
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : "users",
    },
    updatedBy : {
        type : Schema.Types.ObjectId,
        ref : "users"
    }
}, { timestamps: true });


module.exports = mongoose.model("MasterCategory", MasterCategorySchema)