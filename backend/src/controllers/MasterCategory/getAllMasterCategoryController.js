const logger = require('../../utils/logger');
const MasterCategoryService = require('../../services/MasterCategory.service');

async function getAllMasterCategoryController(req,res,next){
     try{
  
         const masterCategoryObj = new MasterCategoryService();
         const allMasterCategory = await masterCategoryObj.getAllMasterCategory();
         if(!allMasterCategory){
               res.status(400).json({
                   message : "No MasterCategory Found !!!"
               })
         }

         return res.status(200).json({
              message : "MasterCategory Fetched Successfully!!!",
              result : allMasterCategory
         })

     }  
     catch(e){
        logger.error(e,"An Error occured while getting all master category controller.");
        next(e);
     }

}


module.exports = getAllMasterCategoryController;