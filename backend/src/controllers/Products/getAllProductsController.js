const  ProductService = require('../../services/product.service');
const logger = require('../../utils/logger');

async function getAllProductsController(req,res,next){
      try{
         const productService = new ProductService();
         const result= await productService.getAllProduct();
         if(!result){
             return res.status(400).json({
                message :"No Product found!!!"
             })
         }
         return res.status(201).json({ products : result});
      }
      catch(e){
         logger.error('An Error Occured in getAllProducts Controllers',e);
         return next(e);
      }
}

module.exports = getAllProductsController;