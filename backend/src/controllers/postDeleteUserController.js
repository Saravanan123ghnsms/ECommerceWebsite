const logger = require('../utils/logger');
const UserService = require('../services/user.service.js');



async function postDeleteController(req,res,next){
     try{
          const userService = new UserService();
          const deletedUser = await userService.deleteUser(req.body);
          return res.status(200).json({
            message : "User Deleted Successfully!!!",
            deletedUser : deletedUser
        });
     }
     catch(e){
        logger.error(e,'An error is occured in postDeleteController');
        return next(e);
     }
}


module.exports  =  {postDeleteController};