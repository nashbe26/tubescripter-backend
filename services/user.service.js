const User = require('../models/user');
const createError = require('http-errors');
const bcrypt = require('bcrypt');


/**
 *
 * This Function will update all user information
 * 
 */
const updateUser =  async (id,data) =>{
    
    if(data.password)
        throw createError(401,"You can't modify user password");

    let oneUser = await User.findOneAndUpdate({_id:id},data,{
        returnOriginal: false,
        
    });

    if(!oneUser)
        throw createError(401,'User not Available');
    
    let updated = {
        firstName:oneUser.firstName,
        lastName:oneUser.lastName,
        email:oneUser.email,
        numTel:oneUser.numTel,
        picture:oneUser.picture,
    }

    return updated;
}
/**
 *
 * This Function will update all user information
 * 
 */
const addUserSubsription =  async (data) =>{
    
    if(!data.user_id)
        throw createError(401,"User id is not defiend");

    const updated = await User.findOneAndUpdate({email:data.user_id},{
        plan:data.type,
        subscribe_id:data.subs
    })

    if(!updated)
        throw createError(401,"Failed to update the website");

    return updated;
}
/**
 * 
 * This Function will search for current user and update his image 
 * 
 */

const addUserPorfile = async (id,img) =>{

    let oneUser = await User.findOneAndUpdate({_id:id},{picture:img},{
        returnOriginal: false,
    });

    if(!oneUser)
        throw createError(401,'User not Available');
    
    return oneUser;

}


/**
 *
 *  This function will returns current logged user
 * 
 */
const getUserById = async (id) =>{

    let oneUser = await User.findById(id,{_id:0,password:0,recovery_token:0,__v:0,createdAt:0,updatedAt:0});
    
    if(!oneUser)
        throw createError(401,'User not Available');
    
    return oneUser;

}


/**
 *
 *  This Function will update user password
 * 
 */
const updatePasswordUser = async (id,data)=>{

    if(!data.password)
        throw createError(401,'Password doesnt exist');

    const hash = bcrypt.hashSync(data.password, 10)

    let oneUser = await User.findOneAndUpdate({_id:id},{password:hash},{
        returnOriginal:false
    })
    

    if(!oneUser)
        throw createError(401,'Failed to update');
    
    return oneUser;

}


module.exports = {
    
    addUserPorfile,
    updateUser,
    getUserById,
    updatePasswordUser,
    addUserSubsription
}