const chatService = require("../services/chat.service");

exports.sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId, message } = req.body;

    if (!receiverId) {
      return res.status(400).json({ success: false, message: "Receiver ID is required" });
    }
    
    // Validation is pushed to the service layer conceptually, 
    // but handled quickly here as per rules to keep controller validation small.
    const data = await chatService.sendMessage(senderId, receiverId, message);
    
    return res.status(201).json({ success: true, message: "Message sent successfully", data });
  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({ success: false, message: error.message || "Internal server error" });
  }
};

exports.getConversation = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    const { receiverId } = req.params;

    if (!receiverId) {
      return res.status(400).json({ success: false, message: "Receiver ID is required" });
    }

    const data = await chatService.getConversation(loggedInUserId, receiverId);
    return res.status(200).json({ success: true, message: "Conversation fetched successfully", data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};

exports.getChatList = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    const data = await chatService.getChatList(loggedInUserId);
    return res.status(200).json({ success: true, message: "Chat list fetched successfully", data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};

exports.markMessagesAsRead = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;
    const { receiverId } = req.params;

    if (!receiverId) {
      return res.status(400).json({ success: false, message: "Receiver ID is required" });
    }

    const count = await chatService.markMessagesAsRead(loggedInUserId, receiverId);
    return res.status(200).json({ success: true, message: "Messages marked as read", data: { updatedCount: count } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};
