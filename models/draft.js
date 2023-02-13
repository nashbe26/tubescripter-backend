const mongoose = require("mongoose");

const drafts = new mongoose.Schema({
    draft_title:{
        type:String
    },
    draft: { 
        title:{ type: String},
        content:{ type: String},
        description:{ type: String},
        hooks:{ type: String},
        intro:{ type: String}
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }

},{
    timestamps:true
})

module.exports = mongoose.model("Drafts", drafts);