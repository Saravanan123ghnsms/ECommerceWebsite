const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require('mongoose');


// we are using mangoose nodejs orm for the schema validataion..

const uri = "mongodb://localhost:27017";

class DBConnection {
    constructor() {
        this.client = null;
    }
    async connect() {
        try {
            if (!this.client) {
                console.log("Creating the New MongoDB Connection....");
                this.client = new MongoClient(uri, {
                    serverApi: {
                        version: ServerApiVersion.v1,
                        strict: true,
                        deprecationErrors: true,
                    },
                    maxPoolSize: 150,
                });

                await this.client.connect();
                console.log("Connection Established Successfully...");
                return this.client;
            }

        }
        catch (e) {
            console.log("An Error Occured while connecting to DB : ", e);
            throw e;
        }


    }
}

module.exports = { DBConnection };



