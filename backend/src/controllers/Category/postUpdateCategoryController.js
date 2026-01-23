const  CategoryService = require('../../services/category.service')
const AppError = require('../../utils/AppError');
const logger = require('../../utils/logger');

async function updateCategoryController(req,res,next){
      try{
       
         if(!req.query?.productId){
             let errorObj = new AppError(400,'CategoryID is Required!!!');
             return next(errorObj);
         }
         const CategoryServiceObj = new CategoryService();
         const CategoryId = req.query.CategoryId;
         const result= await CategoryServiceObj.updateCategory(req.body,CategoryId)
         return res.status(201).json({ 
            message:"Category Updated Successfully!!!",
            product : result,
            
        });
      }
      catch(e){
         logger.error('An Error Occured in updateCategory Controllers',e);
         return next(e);
      }
}

module.exports = updateCategoryController ;