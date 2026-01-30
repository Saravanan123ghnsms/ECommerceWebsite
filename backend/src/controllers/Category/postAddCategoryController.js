const logger = require("../../utils/logger.js")
const CategoryService = require("../../services/category.service.js")

async function postAddCategoryController(req,res,next){
    try{
         const CategoryServiceObj = new CategoryService();
         const createdCategory =  await CategoryServiceObj.addCategory(req.body);
         return res.status(200).json({
            message : "Category Added Successfully!!!",
            createdCategory : createdCategory
         })
    }
    catch(e){

        logger.error(e,"An Error Occured in Post Add Category Controller");
        return next(e);

    }
}

module.exports = postAddCategoryController

