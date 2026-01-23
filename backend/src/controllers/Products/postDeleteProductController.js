const  ProductService = require('../../services/product.service');
const AppError = require('../../utils/AppError');
const logger = require('../../utils/logger');

async function deleteProductController(req,res,next){
      try{
         if(!req.query?.productId){
             const errorObj = new AppError(400,'Missing ProductId!!!');
             return next(errorObj);
         }
         const productService = new ProductService();
         const productId = req.query.productId;
         const result= await productService.deleteProduct(productId);
         return res.status(201).json({ 
            message:"Product Deleted Successfully!!!",
            product : result
        });
      }
      catch(e){
         logger.error('An Error Occured in deleteProduct Controllers',e);
         return next(e);
      }
}

module.exports = deleteProductController;