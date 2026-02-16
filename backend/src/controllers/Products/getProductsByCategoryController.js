const  ProductService = require('../../services/product.service');
const logger = require('../../utils/logger');
const AppError = require('../../utils/AppError');

async function getAllProductsByCategoryController(req,res,next){
     
      try{
         
         if(!req.query?.categoryId){
            const errObj = new AppError(400,'Missing Category Field!!!');
            return next(errObj);
         }
         const productService = new ProductService();
         const categoryId = req.query.categoryId;
         const result= await productService.getProductsByCategory(categoryId);
         return res.status(201).json({ products : result});
      }
      catch(e){
         logger.error(e,'An Error Occured in getAllProductsByCategory Controllers');
         return next(e);
      }
}

module.exports = getAllProductsByCategoryController;