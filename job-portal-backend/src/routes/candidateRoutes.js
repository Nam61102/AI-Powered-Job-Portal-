const express = require("express");

const router = express.Router();

const {
  createProfile,
} = require("../controllers/candidateController");

const {
  getProfile,
  updateProfile,
} = require("../controllers/candidateController");

const {
  authMiddleware,
} = require("../middleware/authMiddleware");

const {
  roleMiddleware,
} = require("../middleware/roleMiddleware");


// CREATE PROFILE
router.post(
  "/profile",
  authMiddleware,
  roleMiddleware("candidate"),
  createProfile
);

// GET PROFILE
router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("candidate"),
  getProfile
);

// UPDATE PROFILE
router.put(
  "/profile",
  authMiddleware,
  roleMiddleware("candidate"),
  updateProfile
);

module.exports = router;