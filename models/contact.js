const mongoose = require("mongoose");

const contacts = new mongoose.Schema({

    firstName: { type: String,required: true,},
    lastName: { type: String,required: true,},
    email: { type: String, required: true },
    content: { type: String, required: true },


},{
    timestamps:true
})

module.exports = mongoose.model("Contacts", contacts);