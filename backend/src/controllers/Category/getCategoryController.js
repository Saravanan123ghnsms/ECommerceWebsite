const logger = require("../../utils/logger");
const AppError = require("../../utils/AppError")
const CategoryService = require("../../services/category.service");


async function getCategoryController(req,res,next){
     try{
           const CategoryServiceObj = new CategoryService();
           const CategoryId = req.body.CategoryId;
           if(!CategoryId){
                throw new AppError(500,"CategoryID is required!!!");
           }
          const Category = await CategoryServiceObj.getCategory(CategoryId);
          if(!Category){
                res.status(404).json({
                    message : "Category not found for the given CategoryID !!! "
                })
          }

          return res.status(200).json({Category});
     }
     catch(e){
        logger.error(e,"An Error occured while fetching the CategoryByID");
        return next(e)
     }
}


module.exports = getCategoryController;