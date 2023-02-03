const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

const { uploadImage } = require("../utils/multer");

router.put("/updateUserData", userController.updateUser);
router.put("/updatePassword", userController.updatePasswordUser);
router.get("/getUser", userController.getUsers);
router.post("/updateUserImage",uploadImage ,userController.addUserPorfile);

module.exports = router;    
