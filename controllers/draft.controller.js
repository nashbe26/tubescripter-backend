const asyncHandler = require("express-async-handler");
const draftService = require("../services/draft.service");

const createDraft = asyncHandler(async (req,res)=>{

    let userId=req.user

    let draft = await draftService.createDraft(userId,req.body);

    res.status(200).json(draft);
})

const updateDraft = asyncHandler(async (req,res)=>{

    let userId=req.user

    let draft = await draftService.updateDraft(userId,req.body);

    res.status(200).json(draft);
})

const deleteDraft = asyncHandler(async (req,res)=>{

    let userId=req.user

    let draft = await draftService.deleteDraft(userId,req.body);

    res.status(200).json(draft);
})

module.exports = {

    createDraft,
    deleteDraft,
    updateDraft
    
}