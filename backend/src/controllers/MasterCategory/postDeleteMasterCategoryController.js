const  MasterCategoryService = require('../../services/MasterCategory.service');
const AppError = require('../../utils/AppError');
const logger = require('../../utils/logger');

async function deleteMasterCategoryController(req,res,next){
      try{
         if(!req.query?.productId){
             const errorObj = new AppError(400,'Missing ProductId!!!');
             return next(errorObj);
         }
         const masterCategoryService = new MasterCategoryService();
         const masterCategoryId = req.query.masterCategoryId;
         const result= await masterCategoryService.deleteMasterCategory(masterCategoryId);
         return res.status(201).json({ 
            message:"MasterCategory Deleted Successfully!!!",
            product : result
        });
      }
      
      catch(e){
         logger.error('An Error Occured in deleteMasterCategory Controllers',e);
         return next(e);
      }
}

module.exports = deleteMasterCategoryController;