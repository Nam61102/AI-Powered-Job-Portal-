const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { roleMiddleware } = require("../middleware/roleMiddleware");

// POST /api/notifications - Admin only
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  notificationController.create
);

// GET /api/notifications - Logged in user
router.get(
  "/",
  authMiddleware,
  notificationController.getAll
);

// PUT /api/notifications/:id/read - Logged in user
router.put(
  "/:id/read",
  authMiddleware,
  notificationController.markRead
);

// GET /api/notifications/count - Logged in user
router.get(
  "/count",
  authMiddleware,
  notificationController.getUnreadCount
);

// PUT /api/notifications/read-all - Logged in user
router.put(
  "/read-all",
  authMiddleware,
  notificationController.markAllRead
);

// DELETE /api/notifications/:id - Logged in user
router.delete(
  "/:id",
  authMiddleware,
  notificationController.remove
);

module.exports = router;
