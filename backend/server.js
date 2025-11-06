require('dotenv').config();
const express = require('express');
const UserRouter = require('./src/routes/user.routes');
const {DBConnectionMangoose} = require('./src/config/dbusingmangoose');
const logger = require('./src/utils/logger');


const connectDB = new DBConnectionMangoose();
(async() =>{
    try{
      await connectDB.connect();
    }
    catch(e){
      console.log("Failed to connect to the DB : ",e);
       process.exit(1);
    }
})();



const app = express();

/* The express.json() is a built-in middleware in Express. It helps your app read JSON data sent from the client (like in POST or PUT requests) and makes it available in req.body. Without it, Express cannot understand JSON data in requests. */

app.use(express.json());




app.use('/api/user',UserRouter);

app.use((err,req,res,next) => {
    logger.error({ err }, '❌ Server Error');
    res.status(err.status || 500 ).json({message : err.message || 'Server Error!!!'});
});


const port = 3000;
app.listen(port,()=>{ logger.info(`Server started on http://localhost:${port}`)});
