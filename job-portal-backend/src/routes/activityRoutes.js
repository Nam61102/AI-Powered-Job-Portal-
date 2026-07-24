const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activityController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { roleMiddleware } = require("../middleware/roleMiddleware");


router.get(
  "/",
  authMiddleware,
  roleMiddleware("recruiter"),
  activityController.getActivities
);

module.exports = router;
