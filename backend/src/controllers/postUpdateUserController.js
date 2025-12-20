const logger = require('../utils/logger');
const UserService = require('../services/user.service');


async function updateUserController(req,res,next){

    try
    {
      const userService = new UserService();
      const updatedUser = await userService.updateUser(req.body);
      return res.status(200).json({
        message : 'User Updated Successfully',
        user : updatedUser
      });

    }
    catch(e){
      logger.error(e,'Error in update user controller');
      next(e);
    }

}

module.exports = {updateUserController};