const Category = require("../models/Category");
const CategoryMetadata = require("../models/CategoryMetadata");
const CategoryMetadataService = require('../services/categorymetadata');
const AppError = require("../utils/AppError")
const logger = require("../utils/logger")

class CategoryService {

    async addCategory(payload) {

        try {
            logger.info()
            const { name, description ,imageUrl, isActive , masterCategory,metadata,user } = payload;
            // Meta data is a array of object
            
            

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
                let Updatedmetadata = JSON.parse(metadata);
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
            
            const CategoryRes = await Category.findById(CategoryID).populate(["masterCategory","metadata"]);
            if(!CategoryRes) {
                throw new AppError(400, "Category Not Found!!!");
            }
            return CategoryRes

        }
        catch(e){
            logger.error(e,"An Error Occured while getCategoryID in the Category Service");
            throw e;
     
        }

    }
    
    async getAllategory(){

        try{

            const allCategory = await Category.find().populate(["masterCategory","metadata"]);
            if(!allCategory){
               throw new AppError(400,"No Category Found in DB.");
            }
            return allCategory;

        }
        catch(e){
            logging.error(e,"An Error Occured while getAllCategory in the Category Service");
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

          let metadatas = [];

          // Updating metatada here
          if(updatedPayload["metadata"]){
              let updatedMetada = JSON.parse(updatedPayload["metadata"]);
               // updated meta is a array of object
               for(let index = 0;index < updatedMetada.length; index++){
                    let metadata = updatedMetada[index];
                    let id = metadata["id"];
                    if(!id){
                      // Id is not present means We will be getting new metadata from the payload
                      // we will be addin this intot he db and appending it the array

                      const newCategoryMetadata = new CategoryMetadata({
                           title : metadata["title"],
                           values : metadata["values"]
                      })
                      const createdMetadata = await newCategoryMetadata.save();
                      metadatas.push(createdMetadata);
                      continue;
                    }
                   let metadataUpdatePayload = {
                        "title" : metadata.title,
                        "values" : metadata.values
                    }
                   let updatedMetadata = await Category.findByIdAndUpdate(
                         id,
                         metadataUpdatePayload,
                         {
                          new : true, // return updated document from the DB
                          runValidators : true 
                         }

                    )
                    metadatas.push(updatedMetadata);
               }
          }

          updatedPayload["metadata"] = metadatas
          const updatedCategory = await Category.findByIdAndUpdate(CategoryId, updatedPayload, { new: true, runValidators: true }).populate(["masterCategory","metadata"]);
          return updatedCategory;
    
        }
        catch (e) {
          logger.error(e, 'An Error Occured in UpdateCategory function in Category Service');
          throw e;
    
        }
      }
    
    async deleteCategory(CategoryId) {

          try {
            const CategoryRes = await Category.findByIdAndDelete(CategoryId);
            if (!CategoryRes) {
              throw new AppError(400, 'Category not found!!!');
            }
            return CategoryRes;
          }
          catch (e) {
            logger.error(e, 'An Error Occured in deleteCategory function in Category Service');
            throw e;
          }
        }

  

}

module.exports = CategoryService