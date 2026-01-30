const {verifyAndGetUser} = require('../authentication/authServer');
const logger = require('../utils/logger');

async function protect(req,res,next){
    try{
        const authHeader = req.headers.authorization || '';
        if(!authHeader.startsWith('Bearer ')){
             return res.status(401).json({message : 'Not Authorized , token missing!!!'});
        }

        const token = authHeader.split(' ')[1];
        const user = await verifyAndGetUser(token);
        logger.info("User is succcessful : ",user);
        if(!user){
                  logger.info("here in not user ones.");
                  return res.status(401).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    }

    catch(err){
         res.status(err.status || 401).json({message : err.message || 'Authentication Failed!!!'});
    }

}


module.exports = {
    protect
};