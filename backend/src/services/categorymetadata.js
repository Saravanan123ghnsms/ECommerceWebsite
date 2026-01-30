
const CategoryMetadata = require('../models/CategoryMetadata');
const logger = require('../utils/logger');



class CategoryMetaDataSerivce {
    async addMetadata(metadatas){
     
       try{
          const metaDataResults = [];
          for (let index = 0; index < metadatas.length; index++) {
              const metaData = metadatas[index];
              const schema = new CategoryMetadata({
                 title : metaData?.title,
                 values : metaData?.values 
              })

              const createdMetadata = await schema.save();
              metaDataResults[index] = createdMetadata;
          }

          return metaDataResults;
       }
       catch(e){
           logger.info(e,"An Error Occured while adding metadata to the db.");
           throw e;
       }    
    }



}


module.exports = CategoryMetaDataSerivce;