const mongoose = require('mongoose');


// we are using mangoose nodejs orm for the schema validataion..

const uri = "mongodb://localhost:27017/ECommerceDB";

const cloud_mongoose_uri =process.env.MONGO_DB_CONNECTION_STRING

class DBConnectionMangoose {
    constructor() {
        this.isConnected = null;
    }
    async connect() {
        try {
            if (!this.isConnected) {
                
                console.log("Creating the New Mongoose Connection....");
                console.log("here is the monoose url : ",cloud_mongoose_uri)
                try{
                    await mongoose.connect(cloud_mongoose_uri, {
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



