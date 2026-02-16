const express = require('express')
const MasterCategoryRouter = express.Router();


const postAddMasterCategoryController = require('../controllers/MasterCategory/postAddMasterCategoryController');
const getGetMasterCategoryController = require('../controllers/MasterCategory/getGetMasterCategoryController');
const postDeleteMasterCategoryController = require('../controllers/MasterCategory/postDeleteMasterCategoryController');
const postUpdateMasterCategoryController = require('../controllers/MasterCategory/postUpdateMasterCategoryController');
const getAllMasterCategoryController = require('../controllers/MasterCategory/getAllMasterCategoryController');

MasterCategoryRouter.get("/getAllMasterCategory",getAllMasterCategoryController);
MasterCategoryRouter.post("/addMasterCategory",postAddMasterCategoryController);
MasterCategoryRouter.get("/getMasterCategory",getGetMasterCategoryController);
MasterCategoryRouter.post("/deleteMasterCategory",postDeleteMasterCategoryController);
MasterCategoryRouter.post("/updateMasterCategory",postUpdateMasterCategoryController);



module.exports = MasterCategoryRouter