const mongoose = require('mongoose');
const {Schema} = mongoose

const InventorySchema = new Schema({
    totalStock : {
        type: Number,
     }, 
    currentStock : {
        type : Number,
     },
     itemSold : {
        type : Number,
     }
},{timestamps : true})



module.exports = mongoose.model("Inventory",InventorySchema)