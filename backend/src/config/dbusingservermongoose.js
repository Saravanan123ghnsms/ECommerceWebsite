require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_DB_CONNECTION_STRING || "Empty string!!!"

console.log(uri)

class MongoServerClientConnection {

    constructor() {
        // Create a MongoClient with a MongoClientOptions object to set the Stable API version
        this.client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        console.log("Client Initialized successfully");
        this.isConnected = null;
    }



    async connect() {

        if (this.isConnected) {
            console.log("MongoDB already connected");
            return this.client;
        }
        try {
            // Connect the client to the server	(optional starting in v4.7)
            await this.client.connect();
            // Send a ping to confirm a successful connection
            await this.client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }
        catch (e) {
            console.log("An Error occured during connecting to the mongo db atlas server ")
        }
        finally {
            // Ensures that the client will close when you finish/error
            await this.client.close();
        }
    }


}


(async () => {
    const obj = new MongoServerClientConnection();
    await obj.connect();
})();


