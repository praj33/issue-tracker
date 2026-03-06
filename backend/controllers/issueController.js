const Issue = require("../models/Issue");
const Comment = require("../models/Comment");

// @desc    Get all issues with optional filters and search
// @route   GET /api/issues
const getAllIssues = async (req, res) => {
    try {
        const { project, priority, status, assignee, search } = req.query;

        const filter = {};

        if (project) filter.project = project;
        if (priority) filter.priority = priority;
        if (status) filter.status = status;
        if (assignee) filter.assignee = assignee;

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        const issues = await Issue.find(filter).sort({ createdAt: -1 });
        res.json(issues);
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

        const comments = await Comment.find({ issueId: issue._id }).sort({ createdAt: -1 });
        res.json({ ...issue.toObject(), comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new issue
// @route   POST /api/issues
const createIssue = async (req, res) => {
    try {
        const { title, description, project, priority, assignee, status } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }

        const issue = await Issue.create({
            title,
            description,
            project,
            priority,
            assignee,
            status,
        });

        res.status(201).json(issue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update issue status
// @route   PATCH /api/issues/:id/status
const updateIssueStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        const issue = await Issue.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!issue) {
            return res.status(404).json({ message: "Issue not found" });
        }

        res.json(issue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a comment to an issue
// @route   POST /api/issues/:id/comments
const addCommentToIssue = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: "Comment text is required" });
        }

        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({ message: "Issue not found" });
        }

        const comment = await Comment.create({
            issueId: issue._id,
            text,
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllIssues,
    getIssueById,
    createIssue,
    updateIssueStatus,
    addCommentToIssue,
};
