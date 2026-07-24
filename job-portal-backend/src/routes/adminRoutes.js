const express = require("express");

const router = express.Router();

const {
  getUsers,
  getJobs,
  deleteUser,
  toggleBlockUser,
  postAnnouncement
} = require("../controllers/adminController");

const {
  authMiddleware
} = require("../middleware/authMiddleware");

const {
  roleMiddleware
} = require("../middleware/roleMiddleware");


// GET USERS
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  getUsers
);


// GET JOBS
router.get(
  "/jobs",
  authMiddleware,
  roleMiddleware("admin"),
  getJobs
);


// DELETE USER
router.delete(
  "/user/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUser
);


// BLOCK / UNBLOCK USER
router.put(
  "/user/:id/block",
  authMiddleware,
  roleMiddleware("admin"),
  toggleBlockUser
);

// POST ANNOUNCEMENT
router.post(
  "/announcement",
  authMiddleware,
  roleMiddleware("admin"),
  postAnnouncement
);

module.exports = router;