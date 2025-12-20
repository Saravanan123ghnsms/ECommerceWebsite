const Category = require('../models/Category');
const Product = require('../models/Product');
const AppError = require('../utils/AppError');
const logger = require('../utils/logger');




class ProductService {

  async getAllProduct() {
    try {
      return await Product.find();
    }
    catch (e) {
      logger.error("An Error Occured while fetching GetAllProducts from Product Service", e);
      throw e;
    }

  }

  async getProductsByCategory(category) {
    logger.info('Reacted getProductByCategory function');
    try {
      const categoryName = await Category.findOne({ name: category });
      if (!categoryName) {
        throw new Error(`Category ${category} is not found!!!`);
      }
      return await Product.find({ category: categoryName._id }).populate('category');
    }
    catch (e) {
      logger.error("An Error Occured while fetching getProductsByCategory  from Product Service", e);
      throw e;
    }
  }

  async addProduct(payload) {
    logger.info('Reached addproduct function');
    try {
      const { categoryName, productName, productDescription, price,
        stock, productImageUrl
      } = payload;

      if (!categoryName) {
        throw new AppError(400, 'Required categoryName to add the product!!!');
      }


      let category = await Category.findOne({ name: categoryName });


      if (!category) {
        category = await new Category({ name: categoryName }).save();
      }

      const product = new Product({
        name: productName,
        description: productDescription,
        price: price,
        stock: stock,
        imageUrl: productImageUrl,
        category: category._id
      })
      const createdProduct = await product.save();
      const result = {
        category,
        createdProduct
      }

      return result;

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
    logger.info('Reached the UpdateProduct function in the Product Service.');
    try {
      const updatedPayload = {};

      for (const key in payload) {
        if (payload[key] !== null && payload[key] !== undefined && payload[key] !== '') {
          updatedPayload[key] = payload[key];
        }
      }

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