const express = require("express");
const router = express.Router();
const interviewController = require("../controllers/interviewController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { roleMiddleware } = require("../middleware/roleMiddleware");

// Recruiter routes
router.post(
  "/schedule",
  authMiddleware,
  roleMiddleware("recruiter"),
  interviewController.scheduleInterview
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("recruiter"),
  interviewController.getInterviews
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  interviewController.updateInterview
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  interviewController.cancelInterview
);

// Candidate routes
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("candidate"),
  interviewController.getMyInterviews
);

// Shared route (Recruiter/Candidate)
router.get(
  "/:id",
  authMiddleware,
  interviewController.getInterview
);

module.exports = router;
