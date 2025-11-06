const express = require('express');
const Userrouter = express.Router();

const {userRegisterController} = require('../controllers/postUserRegisterController');
const { userLoginController } = require('../controllers/postUserLoginController');


// POST /api/register
Userrouter.post('/register',userRegisterController);
Userrouter.post('/login',userLoginController);



module.exports = Userrouter
