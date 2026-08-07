const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat.controller");
const { authMiddleware } = require("../middleware/authMiddleware");

// Protect all chat routes
router.use(authMiddleware);

router.post("/send", chatController.sendMessage);
router.get("/", chatController.getChatList);
router.get("/:receiverId", chatController.getConversation);
router.put("/read/:receiverId", chatController.markMessagesAsRead);

module.exports = router;
