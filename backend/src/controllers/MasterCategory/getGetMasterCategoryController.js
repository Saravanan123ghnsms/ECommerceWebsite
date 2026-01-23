const logger = require("../../utils/logger");
const AppError = require("../../utils/AppError")
const MasterCategoryService = require("../../services/MasterCategory.service");


async function getMasterCategoryController(req,res,next){
     try{
           const masterCategoryServiceObj = new MasterCategoryService();
           const masterCategoryId = req.body.masterCategoryId;
           if(!masterCategoryId){
                throw new AppError(500,"MasterCategoryID is required!!!");
           }
          const masterCategory = await masterCategoryServiceObj.getMasterCategory(masterCategoryId);
          if(!masterCategory){
                res.status(404).json({
                    message : "MasterCategory not found for the given masterCategoryID !!! "
                })
          }

          return res.status(200).json({masterCategory});
     }
     catch(e){
        logger.error(e,"An Error occured while fetching the masterCategoryByID");
        return next(e)
     }
}


module.exports = getMasterCategoryController;