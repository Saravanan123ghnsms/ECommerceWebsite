const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { ref } = require("process");
const Category = require("./Category");
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

MasterCategorySchema.post(
    "deleteOne",{document : true,query:false},async function deleteRelatedCategory(doc){
         const MastercategoryId = doc._id;

         await Category.deleteMany({masterCategory : MastercategoryId});
         console.log("Successfully Deleted the Related Category in the MasterCategory Delete hook.")
    }
)


module.exports = mongoose.model("MasterCategory", MasterCategorySchema)