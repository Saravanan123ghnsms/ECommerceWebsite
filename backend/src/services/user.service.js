const AppError = require("../utils/AppError");
const User = require('../models/User');
const logger = require('../utils/logger');
const bcrypt = require('bcrypt');

class UserService {
    async updateUser(requestPayload) {
        try {
            const userId = requestPayload.id;
            if (!userId) {
                throw new AppError(400, 'UserID is Required!!!');
            }
            
            const updateFields = Object.fromEntries(
                Object.entries(requestPayload).filter(([_, value]) => value !== undefined && value !== null)
            );

            if (Object.keys(updateFields).length === 0) {

                throw new AppError(400, 'No Field Provided  for update');
            }
            
            if(updateFields.password){
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(updateFields.password,salt);
                    updateFields.password = hashedPassword;
            }
            const updateUser = await User.findByIdAndUpdate(
                userId,
                updateFields,
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!updateUser) {
                throw new AppError(404, 'User not found!!!');
            }

            return updateUser;

        }
        catch (e) {
            logger.error(e, 'Error in update user controller');
            throw e;
        }
    }

    async deleteUser(requestPayload){
        try{
            const userId = requestPayload.id;
            if(!userId){
                 throw new AppError(400,'UserID is Required!!!');
            }
            const deleteUser = await User.findByIdAndDelete(
                userId
            )

            if(!deleteUser){
                throw new AppError(400,'User is not found!!!');
            }

            return deleteUser;
        }
        catch(e){
            logger.error(e, 'Error in delete user controller');
            throw e;
        }
    }
}



module.exports = UserService;