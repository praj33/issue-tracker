const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    issueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue",
        required: true,
    },
    text: {
        type: String,
        required: [true, "Comment text is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Comment", commentSchema);
