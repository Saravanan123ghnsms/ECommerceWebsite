const logger = require("../../utils/logger");
const AppError = require("../../utils/AppError")
const CategoryService = require("../../services/category.service");


async function getAllCategoryController(req,res,next){
     try{
           const CategoryServiceObj = new CategoryService();
           const AllCategory = await CategoryServiceObj.getAllategory();


          return res.status(200).json({AllCategory});
     }
     catch(e){
        logger.error(e,"An Error occured while fetching the CategoryByID");
        return next(e)
     }
}


module.exports = getAllCategoryController;