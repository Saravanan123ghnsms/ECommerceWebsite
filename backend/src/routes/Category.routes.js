const express = require('express')
const  {protect} = require('../middleware/auth.middleware.js');
const upload = require('../middleware/fileupload.middleware.js');
const  uploadImageBufferToCloudinary =require('../middleware/cloudinary.uploads.js');

const CategoryRouter = express.Router();



const getCategoryController = require('../controllers/Category/getCategoryController');
const postAddCategoryController = require('../controllers/Category/postAddCategoryController');
const  postDeleteCategoryController = require('../controllers/Category/postDeleteCategoryController');
const postUpdateCategoryController = require('../controllers/Category/postUpdateCategoryController');

CategoryRouter.get("/getCategory",protect,getCategoryController);
CategoryRouter.post("/addCategory",protect,upload.single("image"),uploadImageBufferToCloudinary,postAddCategoryController);
CategoryRouter.post("/deleteCategory",protect,postDeleteCategoryController);
CategoryRouter.post("/updateCategory",protect,postUpdateCategoryController);


module.exports = CategoryRouter;