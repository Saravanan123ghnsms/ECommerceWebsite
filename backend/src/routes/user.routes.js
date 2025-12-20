const express = require('express');
const Userrouter = express.Router();

const {userRegisterController} = require('../controllers/postUserRegisterController');
const { userLoginController } = require('../controllers/postUserLoginController');
const  { updateUserController } = require('../controllers/postUpdateUserController');
const { postDeleteController } = require('../controllers/postDeleteUserController');
 

// POST /api/register
Userrouter.post('/register',userRegisterController);
Userrouter.post('/login',userLoginController);
Userrouter.post('/updateUser',updateUserController);
Userrouter.post('/deleteUser',postDeleteController);




module.exports = Userrouter
