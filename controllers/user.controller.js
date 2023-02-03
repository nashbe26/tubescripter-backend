const asyncHandler = require('express-async-handler');
const userService = require('../services/user.service');


// calling get user service

const getUsers = asyncHandler(async (req, res) => {
    let user_id = req.user
    const user = await userService.getUserById(user_id);
    
    res.status(200).json(user);
});

// calling add photo service

const addUserPorfile = asyncHandler(async (req, res) => {

    let user_id = req.user
    
    if (!req.file) {
        const error = new Error('No File')
        error.httpStatusCode = 400
        return next(error)
        }

    let users = await userService.addUserPorfile(user_id,req.file.originalname);

    res.status(200).json(users);
});

// calling update user sevcice

const updateUser = asyncHandler(async (req, res) => {

    let user_id = req.user

    let users = await userService.updateUser(user_id,req.body);
    res.status(200).json(users);
});



// calling update user service

const updatePasswordUser= asyncHandler(async (req, res, next) => {
    
    const id = req.user
    
    const user = await userService.updatePasswordUser(id,req.body)
    
    res.status(200).json({message:"user password successfully updated"})
})



module.exports = {

    getUsers,
    updateUser,
    updatePasswordUser,
    addUserPorfile
}
