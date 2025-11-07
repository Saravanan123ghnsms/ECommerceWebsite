const  ProductService = require('../services/product.service');
const logger = require('../utils/logger');

async function getAllProductsController(req,res,next){
      try{
         const productService = new ProductService();
         const result= await productService.getAllProduct();
         return res.status(201).json({ products : result});
      }
      catch(e){
         logger.error('An Error Occured in getAllProducts Controllers',e);
         throw e;
      }
}

module.exports = getAllProductsController;