const express = require('express');
const Productrouter = express.Router();
const {protect} = require('../middleware/auth.middleware');
const upload = require('../middleware/fileupload.middleware.js');
const  uploadImageBufferToCloudinary =require('../middleware/cloudinary.uploads.js');

const getAllProductsByCategoryController = require('../controllers/Products/getProductsByCategoryController');
const getAllProductsController = require('../controllers/Products/getAllProductsController');
const postAddProductController = require('../controllers/Products/postAddProductController');
const getProductController = require('../controllers/Products/getProductController');
const deleteProductController = require('../controllers/Products/postDeleteProductController');
const updateProductController = require('../controllers/Products/postUpdateProductController');

 

// POST /api/register
Productrouter.get('/getAllProducts',protect,getAllProductsController);
Productrouter.get('/getProductsByCategory',protect,getAllProductsByCategoryController );
Productrouter.post('/addProduct',protect,upload.single("image"),uploadImageBufferToCloudinary,postAddProductController);
Productrouter.get('/getProductByID',protect,getProductController);
Productrouter.post('/deleteProductByID',protect,deleteProductController);
Productrouter.post('/updateProductByID',protect,upload.single("image"),uploadImageBufferToCloudinary,updateProductController);



module.exports = Productrouter;
