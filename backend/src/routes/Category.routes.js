const express = require('express')

const CategoryRouter = express.Router();



const getCategoryController = require('../controllers/Category/getCategoryController');
const postAddCategoryController = require('../controllers/Category/postAddCategoryController');
const  postDeleteCategoryController = require('../controllers/Category/postDeleteCategoryController');
const postUpdateCategoryController = require('../controllers/Category/postUpdateCategoryController');

CategoryRouter.get("/getCategory",getCategoryController);
CategoryRouter.post("/addCategory",postAddCategoryController);
CategoryRouter.post("/deleteCategory",postDeleteCategoryController);
CategoryRouter.post("/updateCategory",postUpdateCategoryController);


module.exports = CategoryRouter;