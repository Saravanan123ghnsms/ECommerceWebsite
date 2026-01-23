const logger = require("../../utils/logger.js")
const MasterCategoryService = require("../../services/MasterCategory.service.js")

async function postAddMasterCategoryController(req,res,next){
    try{
         const masterCategoryServiceObj = new MasterCategoryService();
         const createdMasterCategory =  await masterCategoryServiceObj.addMasterCategory(req.body);
         return res.status(200).json({
            message : "MasterCategory Added Successfully!!!",
            createdMasterCategory : createdMasterCategory
         })
    }
    catch(e){

        logger.error(r,"An Error Occured in Post AddMaster Category Controller");
        return next(e);

    }
}

module.exports = postAddMasterCategoryController

