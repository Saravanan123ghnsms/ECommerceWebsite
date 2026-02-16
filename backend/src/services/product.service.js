const Category = require('../models/Category');
const Product = require('../models/Product');
const AppError = require('../utils/AppError');
const ProductHelper = require('../helpers/productHelper')
const logger = require('../utils/logger');




class ProductService {

  async getAllProduct() {
    try {
      return await Product.find().populate([
  { path: "createdBy" },
  { path: "updatedBy" },
  {
    path: "category",
    populate: [
      { path: "metadata" },
      { path: "createdBy" },
      { path: "updatedBy" }
    ]
  }
]);
    }
    catch (e) {
      logger.error("An Error Occured while fetching GetAllProducts from Product Service", e);
      throw e;
    }

  }

  async getProductsByCategory(categoryId) {
    logger.info('Reacted getProductByCategory function');
    try {
      const category = await Category.findById(categoryId).populate(["masterCategory","updatedBy","createdBy"]);
      if (!category) {
        throw new Error(`Category ${category} is not found!!!`);
      }
      return await Product.find({ category: category._id }).populate('category');
    }
    catch (e) {
      logger.error("An Error Occured while fetching getProductsByCategory  from Product Service", e);
      throw e;
    }
  }

  async addProduct(payload) {
    
    try {
      const { name,description,originalPrice,discount,stock,imageUrl,category,user
      } = payload;

      if (!category) {
        throw new AppError(400, 'Required CategoryId to add the product!!!');
      }

      let actualCategory = await Category.findById(category).populate(["masterCategory","createdBy","updatedBy"]);


      // We need to calculate the discount of the price

      const productHelper = new ProductHelper();
      
       let parsedOriginalPrice = Number.parseInt(originalPrice);
       let parsedFinalPrice = Number.parseInt(discount)
       let finalPrice = productHelper.calculateDiscount(parsedOriginalPrice,parsedFinalPrice);
      
     

      const product = new Product({
        name: name,
        description: description,
        originalPrice : originalPrice,
        finalPrice : finalPrice,
        discount : discount,
        stock : stock,
        imageUrl : imageUrl,
        category : actualCategory._id,
        createdBy : user,
        updatedBy : user
      })
      const createdProduct = await product.save();
      return createdProduct;

    }
    catch (e) {
      logger.error(e, 'An Error Occured in addProduct Function in ProductService');
      throw e;
    }
  }

  async getProduct(productId) {
    logger.info({ productId }, 'Reached the getProduct function in Product Service File');
    try {
      const product = await Product.findById(productId).populate('category');
      if (!product) {
        throw new AppError(400, 'Product not found!!!');
      }
      return product;
    }
    catch (e) {
      logger.error(e, 'An Error Occured in getProduct function in Product Service');
      throw e;
    }
  }

  async deleteProduct(productId) {
    logger.info({ productId }, 'Reached the deleteProduct function in Product Service File');
    try {
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        throw new AppError(400, 'Product not found!!!');
      }
      return product;
    }
    catch (e) {
      logger.error(e, 'An Error Occured in deleteProduct function in Product Service');
      throw e;
    }
  }

  async updateProduct(payload, productId) {
    
    try {
      const updatedPayload = {};

      for (const key in payload) {
        if (payload[key] !== null && payload[key] !== undefined && payload[key] !== '') {
          updatedPayload[key] = payload[key];
        }
      }

      delete updatedPayload['createdBy'];

      const updatedProduct = await Product.findByIdAndUpdate(productId, updatedPayload, { new: true, runValidators: true });
      return updatedProduct;

    }
    catch (e) {
      logger.error(e, 'An Error Occured in updateProduct function in product Service');
      throw e;

    }
  }

}


module.exports = ProductService