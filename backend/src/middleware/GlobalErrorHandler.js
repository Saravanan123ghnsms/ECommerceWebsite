const logger = require('../utils/logger');


function globalHandlerFunction(err,req,res,next){
     const status= err.status || err.statusCode || 500;
     const message = err.message || 'Internal Server Error from global error handler';


     logger.error(err,'Unhandled error!!!');

     const response = { message };


     // For Future Purpose - Do not leak the Stack trace in production
    //  if(process.env.NODE_ENV !== 'production'){
    //     response.stack = err.stack;
    //  }

     res.status(status).json(response);
}


module.exports = globalHandlerFunction;