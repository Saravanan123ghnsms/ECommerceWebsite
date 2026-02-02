const logger = require('../utils/logger');
const AppError = require('../utils/AppError');
const Product = require('../models/Product');

class ProductHelper{
     
    calculateDiscount(finalPrice,discount){
         try{
              if(typeof finalPrice != "number" || typeof discount != "number"){
                  
                throw new AppError(500,"FinalPrice and Discount should be number!!!");

              }
              return finalPrice * (discount / 100);
         }
         catch(e){
             logger.error(e,"An error Occured while calculationg discount of the price.");
             throw e;
         }
    }
}

module.exports = ProductHelper;