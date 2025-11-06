
const mongoose = require('mongoose');


// we are using mangoose nodejs orm for the schema validataion..

const uri = "mongodb://localhost:27017/ECommerceDB";

class DBConnectionMangoose {
    constructor() {
        this.isConnected = null;
    }
    async connect() {
        try {
            if (!this.isConnected) {
                
                console.log("Creating the New Mongoose Connection....");
                try{
                    await mongoose.connect(uri, {
                    maxPoolSize: 150, 
                    serverSelectionTimeoutMS: 5000,
                });

                this.isConnected = true;
                console.log("Mongoose Connection Established Successfully...");

                }
                catch(e){
                        console.error("❌ Mongoose connection error:", e.message);
                        console.error("Full error details:", e);
                        throw e;
                }

                
            }
            return this.isConnected;

        }
        catch (e) {
            console.log("An Error Occured while connecting to MongoDB via Mongoose: ", e);
            throw e;
        }


    }
}

module.exports = { DBConnectionMangoose};



