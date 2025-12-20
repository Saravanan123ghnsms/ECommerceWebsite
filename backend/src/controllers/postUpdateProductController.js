const { error } = require('console');
const  ProductService = require('../services/product.service');
const AppError = require('../utils/AppError');
const logger = require('../utils/logger');

async function updateProductController(req,res,next){
      try{
       
         if(!req.query?.productId){
             let errorObj = new AppError(400,'ProductID is Required!!!');
             return next(errorObj);
         }
         const productService = new ProductService();
         const productId = req.query.productId;
         const result= await productService.updateProduct(req.body,productId);
         return res.status(201).json({ 
            message:"Product Updated Successfully!!!",
            product : result,
            
        });
      }
      catch(e){
         logger.error('An Error Occured in updateProduct Controllers',e);
         return next(e);
      }
}

module.exports = updateProductController;