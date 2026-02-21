const Category = require("../models/Category")
const CategoryMetadata = require("../models/CategoryMetadata")
const MasterCategory = require("../models/MasterCategory")
const AppError = require("../utils/AppError")
const logger = require("../utils/logger")

class MasterCategoryService {

    async addMasterCategory(payload) {

        try {
            const { name, description , iconUrl , bannerUrl , isActive , displayOrder } = payload;

            const MasterCategoryObj = new MasterCategory({
                name : name,
                description : description,
                iconUrl : iconUrl,
                bannerUrl : bannerUrl,
                isActive: isActive,
                displayOrder : displayOrder
            })

            const createdMasterCategory = await MasterCategoryObj.save();

            return {createdMasterCategory}

        }
        catch (e) {
            logger.error(e, 'An Error Occured in addMasterCategory Function in MasterCategoryService');
            throw e;

        }
    }


    async getMasterCategory(masterCategoryID){

        try{

            const masterCategory = await MasterCategory.findById(masterCategoryID);
            if(!masterCategory) {
                throw new AppError(400, "MasterCategory Not Found!!!");
            }
            return masterCategory

        }
        catch(e){
            logging.error(e,"An Error Occured while getMasterCategoryID in the MasterCategory Service");
            throw e;
     
        }

    }

    async getAllMasterCategory(){
         try{

          const allMasterCategory = await MasterCategory.find().populate(["createdBy","updatedBy"]);
          return allMasterCategory;

         }
         catch(e){
            logger.error(e,"An Error occured while getting all master category in mastercateogry service.");
            throw e;
         }
    }


    async updateMasterCategory(payload, masterCategoryId) {
        
        try {
          const updatedPayload = {};
    
          for (const key in payload) {
            if (payload[key] !== null && payload[key] !== undefined && payload[key] !== '') {
              updatedPayload[key] = payload[key];
            }
          }
          // Deleting the created by payload from the Request if it is.
          delete updatedPayload["createdBy"];

          const updatedMasterCategory = await MasterCategory.findByIdAndUpdate(masterCategoryId, updatedPayload, { new: true, runValidators: true });
          return updatedMasterCategory;
    
        }
        catch (e) {
          logger.error(e, 'An Error Occured in UpdateMasterCategory function in MasterCategory Service');
          throw e;
    
        }
      }
    
    async deleteMasterCategory(masterCategoryId) {

          try {
            const masterCategory = await MasterCategory.findByIdAndDelete(masterCategoryId);
            if (!masterCategory) {
              throw new AppError(400, 'MasterCategory not found!!!');
            }
            return masterCategory;
          }
          catch (e) {
            logger.error(e, 'An Error Occured in deleteMasterCategory function in masterCategory Service');
            throw e;
          }
        }

  

}

module.exports = MasterCategoryService