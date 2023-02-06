const express = require("express");
const router = express.Router();

const languageController = require("../controllers/language.controller");

router.get("/language", languageController.getLanguage);

module.exports = router;