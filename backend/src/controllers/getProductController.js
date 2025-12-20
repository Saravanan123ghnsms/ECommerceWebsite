const  ProductService = require('../services/product.service');
const AppError = require('../utils/AppError');
const logger = require('../utils/logger');

async function getProductController(req,res,next){
      try{
         if(!req.query?.productId){
             const errorObj = new AppError(400,'Missing ProductId!!!');
             return next(errorObj);
         }
         const productService = new ProductService();
         const productId = req.query.productId;
         const result= await productService.getProduct(productId);
         return res.status(201).json({ product : result});
      }
      catch(e){
         logger.error('An Error Occured in getAllProducts Controllers',e);
         return next(e);
      }
}

module.exports = getProductController;