const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { ref } = require("process");
const {Schema} = mongoose;



const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    masterCategory: {
        type: Schema.Types.ObjectId,
        ref: "MasterCategory",
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true
    },
    metadata : {
        type : [Schema.Types.ObjectId],
        ref : "CategoryMetadata"
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

module.exports = mongoose.model("Category", CategorySchema)