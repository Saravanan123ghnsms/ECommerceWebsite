const  CategoryService = require('../../services/category.service');
const AppError = require('../../utils/AppError');
const logger = require('../../utils/logger');

async function deleteCategoryController(req,res,next){
      try{
         if(!req.query?.CategoryId){
             const errorObj = new AppError(400,'Missing ProductId!!!');
             return next(errorObj);
         }
         const CategoryServiceObj = new CategoryService();
         const CategoryId = req.query.CategoryId;
         const result= await CategoryServiceObj.deleteCategory(CategoryId);
         return res.status(201).json({ 
            message:"Category Deleted Successfully!!!",
            product : result
        });
      }
      
      catch(e){
         logger.error('An Error Occured in deleteCategory Controllers',e);
         return next(e);
      }
}

module.exports = deleteCategoryController;