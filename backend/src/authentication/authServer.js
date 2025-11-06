require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User  = require("../models/User");


const JWT_SECRET = process.env.JWT_SECRET ;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';


// Function to generate the token
function generateToken(payload){
    return jwt.sign(payload,JWT_SECRET,{expiresIn  :  JWT_EXPIRES_IN });
}

async function registerUser({name ,email, password}){
     if(!name || !email || !password){
         const error = new Error('Name, email and password are required!!!');
         error.status = 400;
         throw error;
     }

     // checking if the user is already exists....
     const existing = await User.findOne({email});

     if(existing){
        const err = new Error("User is already Registered!!!");
        err.status = 409;
        throw err;
     }

     // We are hashing password here for security purpose....
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password,salt);


     const user = new User({
        name,
        email,
        password : hashedPassword
     });

     await user.save();

     const token = generateToken({id : user._id, email : user.email});

     const safeUser = {
         id : user._id,
         name : user.name,
         email : user.email,
         role : user.role
     };

     
     return {user : safeUser , authToken : token};


};


// function for to login the user and the fucntion is called paramter desctruction 
async function loginUser({email,password}){

   if(!email || !password){
       const err = new Error("Email and Password Required!!!");
       err.status = 400;
       throw err;
   }

   email = email.toLowerCase().trim();

   const user = await User.findOne({email}).select("+password");
   if(!user){
      const err = new Error('Invalid Credentials');
      err.status = 401;
      throw err;
   };

   //comparing password...
   const match =  await bcrypt.compare(password,user.password);
   if(!match){
     const err = new Error('Invalid Credentials. Password didnt match');
     err.status = 401;
     throw err;
   };

   // Generate Token....
   const token = generateToken({ id : user._id, email : user.email });

   const safeUser = {
     id : user._id,
     name : user.name,
     email : user.email,
     role : user.role
   };

   return { user : safeUser , authToken : token};


}


// Function to verifty the token
/*
 Purpose of verifyAndGetUser()

verifyAndGetUser() is used to authenticate protected API requests later.

In plain English:

It verifies that the request comes from a real, logged-in user by:

Checking if the token exists (in the request header)

Validating the token using jwt.verify() with your secret key

Extracting user info (user ID from the token)

Fetching the actual user record from the database (excluding password)

Returning that user so the route knows “who is making this request”

*/

async function verifyAndGetUser(token){
     if(!token){
        const err = new Error('Token Missing');
        err.status = 401;
        throw err;
     };

     let decoded;

     try{
        decoded = jwt.verify(token,JWT_SECRET);
     }
     catch(e){
        const err = new Error('Invalid or Expired Token');
        err.status = 401;
        throw err;
     }
     // Find user and dont show the password...

     const user = await User.findById(decoded.id).select('-password');
     if(!user){
        const err = new Error('User not found!!!');
        err.status = 404;
        throw err;
     }

     return user;
}


module.exports = {
    registerUser,
    loginUser,
    generateToken,
    verifyAndGetUser
}