var express = require('express');
const router = express.Router();

const draftController = require('../controllers/draft.controller');

router.post("/createDraft", draftController.createDraft);
router.put("/updateDraft", draftController.updateDraft);
router.delete("/deleteDraft", draftController.deleteDraft);

module.exports = router;
