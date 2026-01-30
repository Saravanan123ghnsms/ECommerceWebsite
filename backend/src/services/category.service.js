const Category = require("../models/Category")
const CategoryMetadataService = require('../services/categorymetadata');
const AppError = require("../utils/AppError")
const logger = require("../utils/logger")

class CategoryService {

    async addCategory(payload) {

        try {
            logger.info()
            const { name, description ,imageUrl, isActive , masterCategory,metadata,user } = payload;
            // Meta data is a array of object
            
            let Updatedmetadata = JSON.parse(metadata);

            let CategoryObject = {
                name : name,
                description : description,
                isActive: isActive, 
                imageUrl : imageUrl,
                masterCategory : masterCategory,
                createdBy : user,
                updatedBy : user
            }
            
            if(metadata){
                const  categoryMetadataService = new CategoryMetadataService();
                const metadataResult = await categoryMetadataService.addMetadata(Updatedmetadata);
                CategoryObject["metadata"] = metadataResult;
            }

            const CategoryObj = new Category(CategoryObject);

            const CreatedCategory = await CategoryObj.save();

            return {CreatedCategory}

        }
        catch (e) {
            logger.error(e, 'An Error Occured in addCategory Function in CategoryService');
            throw e;

        }
    }


    async getCategory(CategoryID){

        try{

            const Category = await Category.findById(CategoryID);
            if(!Category) {
                throw new AppError(400, "Category Not Found!!!");
            }
            return Category

        }
        catch(e){
            logging.error(e,"An Error Occured while getCategoryID in the Category Service");
            throw e;
     
        }

    }


    async updateCategory(payload, CategoryId) {
        
        try {
          const updatedPayload = {};
    
          for (const key in payload) {
            if (payload[key] !== null && payload[key] !== undefined && payload[key] !== '') {
              updatedPayload[key] = payload[key];
            }
          }
    
          const updatedCategory = await Category.findByIdAndUpdate(CategoryId, updatedPayload, { new: true, runValidators: true });
          return updatedCategory;
    
        }
        catch (e) {
          logger.error(e, 'An Error Occured in UpdateCategory function in Category Service');
          throw e;
    
        }
      }
    
    async deleteCategory(CategoryId) {

          try {
            const Category = await Category.findByIdAndDelete(CategoryId);
            if (!product) {
              throw new AppError(400, 'Product not found!!!');
            }
            return Category;
          }
          catch (e) {
            logger.error(e, 'An Error Occured in deleteCategory function in Category Service');
            throw e;
          }
        }

  

}

module.exports = CategoryService