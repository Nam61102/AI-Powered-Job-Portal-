const express = require("express");
const router = express.Router();
const { resumeMatch } = require("../controllers/aiController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { roleMiddleware } = require("../middleware/roleMiddleware");

// POST /api/ai/resume-match
// Protected by authMiddleware and restricted to candidates
router.post("/resume-match", authMiddleware, roleMiddleware("candidate"), resumeMatch);

module.exports = router;
