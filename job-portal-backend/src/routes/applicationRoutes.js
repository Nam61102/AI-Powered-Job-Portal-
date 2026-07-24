const express = require("express");

const router = express.Router();

const {
  applyJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const {
  authMiddleware,
} = require("../middleware/authMiddleware");

const {
  roleMiddleware,
} = require("../middleware/roleMiddleware");


// APPLY JOB
router.post(
  "/apply",
  authMiddleware,
  roleMiddleware("candidate"),
  applyJob
);


// GET MY APPLICATIONS
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("candidate"),
  getMyApplications
);


// GET APPLICANTS FOR JOB
router.get(
  "/job/:jobId",
  authMiddleware,
  roleMiddleware("recruiter"),
  getApplicantsForJob
);


// UPDATE STATUS
router.put(
  "/status",
  authMiddleware,
  roleMiddleware("recruiter"),
  updateApplicationStatus
);

module.exports = router;