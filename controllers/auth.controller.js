const asyncHandler = require('express-async-handler');
const authService = require('../services/auth.service');
const { generateJWT } = require('../utils/jwt');

//Calling register Service

const register = asyncHandler(async (req, res) => {
    console.log(req.body);
    const user = await authService.register(req.body);
    res.status(200).json(user);
});

//Calling login Service

const login = asyncHandler(async (req, res, _) => {

      let response = await authService.login(req.body);

      const token = generateJWT(response);

      if (!token)
      throw createError(404, `Failed to login due some reasons`)

      res.status(200).json({token,data:{
        firstName:response.firstName,
        lastName:response.lastName
      }});
  
});

const forgetAccount = asyncHandler(async (req, res, _) => {
    const { email } = req.body
    const token = await authService.forgetAccount(email)
    console.log(token);
    res.status(200).json({ message: 'Request successfuly Sent' })
})

const resetAccount = asyncHandler(async (req, res, _) => {
    const { token } = req.query
    console.log(token);
    const { password } = req.body
    await authService.resetAccount(password, token)
    res.status(200).json({ message: 'Password successfuly updated' })
})

module.exports = {
    register,
    login,
    forgetAccount,
    resetAccount
}