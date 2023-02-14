var express = require("express");
const router = express.Router();

const draftController = require("../controllers/draft.controller");

router.get("/getmydrafts", draftController.getmydrafts);
router.get("/getonedraft/:_id", draftController.getonedraft);
router.post("/createDraft", draftController.createDraft);
router.put("/updateDraft", draftController.updateDraft);
router.delete("/deleteDraft", draftController.deleteDraft);

module.exports = router;
