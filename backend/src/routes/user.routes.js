const express = require('express');
const Userrouter = express.Router();

const {userRegisterController} = require('../controllers/Users/postUserRegisterController');
const { userLoginController } = require('../controllers/Users/postUserLoginController');
const  { updateUserController } = require('../controllers/Users/postUpdateUserController');
const { postDeleteController } = require('../controllers/Users/postDeleteUserController');
 

// POST /api/register
Userrouter.post('/register',userRegisterController);
Userrouter.post('/login',userLoginController);
Userrouter.post('/updateUser',updateUserController);
Userrouter.post('/deleteUser',postDeleteController);




module.exports = Userrouter
