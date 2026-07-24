const notificationService = require("../services/notification.service");

/**
 * Reusable helper to create a notification.
 * @param {number} receiverId - ID of the user receiving the notification
 * @param {string} title - Notification title
 * @param {string} message - Notification message
 * @param {string} type - Notification type from constants
 */
const createNotification = async (receiverId, title, message, type) => {
  try {
    const notification = await notificationService.createNotification({
      title,
      message,
      type,
      receiverId: parseInt(receiverId, 10),
    });
    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    // Don't throw the error, we don't want notifications to block main flows like apply job
  }
};

module.exports = {
  createNotification,
};
