const Draft = require("../models/draft");
const User = require("../models/user");
const createError = require("http-errors");

var mongoose = require("mongoose");

const getonedraft = async (userId, _id) => {
  if (!userId) throw createError(401, "User id is not defiend");

  let draft = Draft.findOne({ userId, _id });

  if (!draft) throw createError(400, "failed to add it to user draft");

  return draft;
};

const getallbyuser = async (userId) => {
  if (!userId) throw createError(401, "User id is not defiend");

  let drafts = Draft.find({ userId });

  if (!drafts) throw createError(400, "failed to add it to user draft");

  return drafts;
};

const createDraft = async (userId, data) => {
  if (!userId) throw createError(401, "User id is not defiend");

  let convertedId = mongoose.Types.ObjectId(userId);

  let obj = {
    draft: data.draft,
    userId: convertedId,
    draft_title: data.draft_title,
  };
  const draft = await Draft.create(obj);

  if (!draft) throw createError(400, `Failed to add the draft`);

  let dta = await User.findByIdAndUpdate(
    userId,
    {
      $push: {
        drafts: { drafts_id: draft._id },
      },
    },
    {
      returnOriginal: false,
    }
  );

  if (!dta) throw createError(400, "failed to add it to user draft");

  return draft;
};

const updateDraft = async (userId, data) => {
  if (!userId) throw createError(401, "User id is not defiend");

  const updated = await Draft.findOneAndUpdate(
    { _id: data._id },
    {
      draft: data.draft,
    }
  );

  if (!updated) throw createError(401, "Failed to update the website");

  return updated;
};

const deleteDraft = async (data) => {
  if (!data.user_id) throw createError(401, "User id is not defiend");

  const updated = await Draft.findOneAndDelete({ _id: data.id });

  if (!updated) throw createError(401, "Failed to update the website");

  return updated;
};

module.exports = {
  getonedraft,
  createDraft,
  deleteDraft,
  updateDraft,
  getallbyuser,
};
