const express = require('express');
const Productrouter = express.Router();

const getAllProductsByCategoryController = require('../controllers/Products/getProductsByCategoryController');
const getAllProducts = require('../controllers/Products/getProductController');
const postAddProductController = require('../controllers/Products/postAddProductController');
const getProductController = require('../controllers/Products/getProductController');
const deleteProductController = require('../controllers/Products/postDeleteProductController');
const updateProductController = require('../controllers/Products/postUpdateProductController');

 

// POST /api/register
Productrouter.get('/getAllProducts',getAllProducts);
Productrouter.get('/getProductsByCategory',getAllProductsByCategoryController );
Productrouter.post('/addProduct',postAddProductController);
Productrouter.get('/getProductByID',getProductController);
Productrouter.delete('/deleteProductByID',deleteProductController);
Productrouter.patch('/updateProductByID',updateProductController);



module.exports = Productrouter;
