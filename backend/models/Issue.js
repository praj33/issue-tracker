const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Open", "In Progress", "Closed", "Resolved"],
        default: "Open",
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High", "Critical"],
        default: "Medium",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Issue", issueSchema);
