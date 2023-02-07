const mongoose = require("mongoose");

const Users = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, maxLength: 50, unique: true },
    password: { type: String, required: true, maxLength: 150, minLength: 6 },
    numTel: { type: String, maxLength: 15, minLength: 8 },
    language: { type: String, default: "Fr", enum: ["Fr", "En"] },
    picture: { type: String, default: "user.png" },
    recovery_token: { type: String },
    plan: { type: String, default: "free" },
    subscribe_id: { type: String },
    nbr_words: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", Users);
