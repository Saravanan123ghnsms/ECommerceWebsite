const logger = require('../utils/logger');
const ProductService = require('../services/product.service.js');



async function postAddProductController(req,res,next){
     try{
          const productService = new ProductService();
          const product = await productService.addProduct(req.body);
          return res.status(200).json({
            message : "Product Added Successfully!!!",
            addedProduct : product
          });
     }
     catch(e){
        logger.error(e,'An error is occured in postAddProductController');
        return next(e);
     }
}


module.exports  =  postAddProductController;