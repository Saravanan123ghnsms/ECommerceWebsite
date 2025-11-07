const Category = require('../models/Category');
const Product = require('../models/Product');
const logger = require('../utils/logger');




class ProductService{


    async  getAllProduct(){
      try{
       return await Product.find();
      }
      catch(e){
         logger.error("An Error Occured while fetching GetAllProducts from Product Service",e);
         throw e;
      }
      
    }

    async  getProductsByCategory(category){
      logger.info('Reacted getProductByCategory function');
      try{
        const categoryName = await Category.findOne({name : category});
        if(!categoryName){
             throw new Error(`Category ${category} is not found!!!`);
        }
        return await Product.find({category : categoryName._id}).populate('category');
      }
      catch(e){
         logger.error("An Error Occured while fetching getProductsByCategory  from Product Service",e);
         throw e;
      }
    }

}


module.exports = ProductService