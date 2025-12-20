const logger = require('../utils/logger');


function globalHandlerFunction(err,req,res,next){
     const status= err.status || err.statusCode || 500;
     let message = err.message || 'Internal Server Error from global error handler';
     


     logger.error(err,'Unhandled error!!!');

     const response = { message };
     


     // For Future Purpose - Do not leak the Stack trace in production
    //  if(process.env.NODE_ENV !== 'production'){
    //     response.stack = err.stack;
    //  }

     // Here return is no needed because it is the last one executing here so ....there is no point of using the return keyword here..
     res.status(status).json(response);
}


module.exports = globalHandlerFunction;