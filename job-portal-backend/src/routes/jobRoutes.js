const express = require("express");

const router = express.Router();

const {
  createJob,
  getJobs,
  getSingleJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const {
  authMiddleware,
} = require("../middleware/authMiddleware");

const {
  roleMiddleware,
} = require("../middleware/roleMiddleware");


// CREATE JOB
router.post(
  "/create",
  authMiddleware,
  roleMiddleware("recruiter"),
  createJob
);


// GET ALL JOBS
router.get("/", getJobs);


// GET SINGLE JOB
router.get("/:id", getSingleJob);


// UPDATE JOB
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  updateJob
);


// DELETE JOB
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("recruiter"),
  deleteJob
);

module.exports = router;