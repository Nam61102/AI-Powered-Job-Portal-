const notificationService = require("../services/notification.service");

exports.create = async (req, res) => {
  try {
    const { title, message, type, receiverId } = req.body;

    if (!title || !message || !type || !receiverId) {
      return res.status(400).json({
        success: false,
        message: "title, message, type, and receiverId are required",
      });
    }

    const parsedUserId = parseInt(receiverId, 10);
    if (isNaN(parsedUserId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId",
      });
    }

    const notification = await notificationService.createNotification({
      title,
      message,
      type,
      receiverId: parsedUserId,
    });

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await notificationService.getUserNotifications(userId);

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.markRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const notification = await notificationService.markAsRead(id, userId);

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    if (error.message === "Notification not found") {
      return res.status(404).json({
        success: false,
        message: "Notification not found or unauthorized",
      });
    }
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await notificationService.deleteNotification(id, userId);

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    if (error.message === "Notification not found") {
      return res.status(404).json({
        success: false,
        message: "Notification not found or unauthorized",
      });
    }
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const count = await notificationService.getUnreadCount(userId);

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.markAllRead = async (req, res) => {
  try {
    const userId = req.user.id;
    await notificationService.markAllRead(userId);

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
