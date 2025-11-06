
const { registerUser } = require('../authentication/authServer');


async function userRegisterController(req,res,next){
    try{
        const {user,authToken} = await registerUser(req.body);
        return res.status(201).json({
            user,authToken
        });
        

    }
    catch(e){
        res.status(e.status || 500).json({message : e.message || 'An Error Occured in registerUser function '})
    }
}


module.exports =  {
     userRegisterController
};