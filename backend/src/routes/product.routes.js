const express = require('express');
const Productrouter = express.Router();

const getAllProductsByCategoryController = require('../controllers/getProductsByCategoryController');
const getAllProducts = require('../controllers/getAllProductsController');
const postAddProductController = require('../controllers/postAddProductController');
const getProductController = require('../controllers/getProductController');
const deleteProductController = require('../controllers/postDeleteProductController');
const updateProductController = require('../controllers/postUpdateProductController');

 

// POST /api/register
Productrouter.get('/getAllProducts',getAllProducts);
Productrouter.get('/getProductsByCategory',getAllProductsByCategoryController );
Productrouter.post('/addProduct',postAddProductController);
Productrouter.get('/getProductByID',getProductController);
Productrouter.delete('/deleteProductByID',deleteProductController);
Productrouter.patch('/updateProductByID',updateProductController);



module.exports = Productrouter;
