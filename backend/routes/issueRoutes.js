const express = require("express");
const router = express.Router();
const {
    getAllIssues,
    getIssueById,
    createIssue,
    updateIssueStatus,
    addCommentToIssue,
} = require("../controllers/issueController");

router.get("/", getAllIssues);
router.get("/:id", getIssueById);
router.post("/", createIssue);
router.put("/:id", updateIssueStatus);
router.post("/:id/comments", addCommentToIssue);

module.exports = router;
