const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { ref } = require("process");
const Product = require("./Product");
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


// Apply post hook for if It is get deleted related products should also deleted

CategorySchema.post(
    "deleteOne",{document : true,query:false},async function deleteRelatedProducts(doc){
         const categoryId = doc._id;

         await Product.deleteMany({category:categoryId});
         console.log("Successfully Deleted the Related Products in the Product.")
    }
)

module.exports = mongoose.model("Category", CategorySchema)