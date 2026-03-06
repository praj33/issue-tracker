const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        project: {
            type: String,
            enum: ["Website Redesign", "Client Dashboard", "Mobile App", "Internal Tools"],
            default: "Website Redesign",
        },
        priority: {
            type: String,
            enum: ["Low", "Medium", "High", "Critical"],
            default: "Medium",
        },
        assignee: {
            type: String,
            enum: ["Rahul", "Ananya", "Dev", "Priya", "Arjun"],
            default: "Rahul",
        },
        status: {
            type: String,
            enum: ["Open", "In Progress", "Resolved", "Closed"],
            default: "Open",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);
