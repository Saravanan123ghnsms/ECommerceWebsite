const  MasterCategoryService = require('../../services/MasterCategory.service')
const AppError = require('../../utils/AppError');
const logger = require('../../utils/logger');

async function updateMasterCategoryController(req,res,next){
      try{
       
         if(!req.query?.productId){
             let errorObj = new AppError(400,'MasterCategoryID is Required!!!');
             return next(errorObj);
         }
         const masterCategoryService = new MasterCategoryService();
         const masterCategoryId = req.query.masterCategoryId;
         const result= await masterCategoryService.updateMasterCategory(req.body,masterCategoryId)
         return res.status(201).json({ 
            message:"MasterCategory Updated Successfully!!!",
            product : result,
            
        });
      }
      catch(e){
         logger.error('An Error Occured in updateMasterCategory Controllers',e);
         return next(e);
      }
}

module.exports = updateMasterCategoryController ;