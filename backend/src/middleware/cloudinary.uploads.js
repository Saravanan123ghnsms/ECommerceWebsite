const cloudinary  = require('cloudinary').v2;
const logger = require('../utils/logger')

require('dotenv').config();


async function uploadImageBufferToCloudinary(req,res,next){
   try{
    logger.info("reached the clodudinary function")
    // Instatiating the cloudinary config.
     cloudinary.config({
            cloud_name : process.env.CLOUD_NAME,
            api_key : process.env.API_KEY,
            api_secret : process.env.API_SECRET
    });
    const result = await new Promise((resolve,reject) => {
                const stream = cloudinary.uploader.upload_stream({
                    folder : "uploads",  // Giving the folder name for cloudinary service.
                    resource_type : "image"
                },
                (error,result) => {
                    if(error){
                        reject(error);
                    }
                    else{
                        resolve(result);
                    }
                }
            
            );

            stream.end(req.file.buffer);
     });
     
     if(req.user){
        req.body.user = req.user;
     }
     req.body.imageUrl = result.secure_url;
     req.body.imagePublicID = result.public_id;
     logger.info("Successfullu uplaod file to the clodianry");
     next();

  
   }
   catch(e){
        logger.error(e,"An Error Occured while uploading the file to the Cloudinary.");
        next(e);
   }
}


module.exports = uploadImageBufferToCloudinary

