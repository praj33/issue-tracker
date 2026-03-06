const Issue = require("../models/Issue");

// @desc    Get all issues
// @route   GET /api/issues
const getIssues = async (req, res) => {
    try {
        const issues = await Issue.find().sort({ createdAt: -1 });
        res.json(issues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new issue
// @route   POST /api/issues
const createIssue = async (req, res) => {
    try {
        const { title, description, status, priority } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const issue = await Issue.create({ title, description, status, priority });
        res.status(201).json(issue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get a single issue by ID
// @route   GET /api/issues/:id
const getIssueById = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({ message: "Issue not found" });
        }

        res.json(issue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete an issue
// @route   DELETE /api/issues/:id
const deleteIssue = async (req, res) => {
    try {
        const issue = await Issue.findByIdAndDelete(req.params.id);

        if (!issue) {
            return res.status(404).json({ message: "Issue not found" });
        }

        res.json({ message: "Issue deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getIssues,
    createIssue,
    getIssueById,
    deleteIssue,
};
