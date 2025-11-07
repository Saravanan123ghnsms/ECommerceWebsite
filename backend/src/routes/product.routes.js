const express = require('express');
const Productrouter = express.Router();

const getAllProductsByCategoryController = require('../controllers/getProductsByCategoryController');
const getAllProducts = require('../controllers/getAllProductsController');
 

// POST /api/register
Productrouter.get('/getAllProducts',getAllProducts);
Productrouter.get('/getProductsByCategory',getAllProductsByCategoryController );



module.exports = Productrouter;
