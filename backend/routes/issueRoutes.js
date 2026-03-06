const express = require("express");
const router = express.Router();
const {
    getIssues,
    createIssue,
    getIssueById,
    deleteIssue,
} = require("../controllers/issueController");

router.get("/", getIssues);
router.post("/", createIssue);
router.get("/:id", getIssueById);
router.delete("/:id", deleteIssue);

module.exports = router;
