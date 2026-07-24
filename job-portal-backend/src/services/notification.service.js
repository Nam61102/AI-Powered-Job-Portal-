const prisma = require("../config/prisma");

exports.createNotification = async ({ title, message, type, receiverId }) => {
  return await prisma.notification.create({
    data: {
      title,
      message,
      type,
      receiverId,
    },
  });
};

exports.getUserNotifications = async (receiverId) => {
  return await prisma.notification.findMany({
    where: {
      receiverId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

exports.markAsRead = async (id, receiverId) => {
  // We check if it belongs to the user
  const notification = await prisma.notification.findFirst({
    where: { id, receiverId },
  });

  if (!notification) {
    throw new Error("Notification not found");
  }

  return await prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });
};

exports.deleteNotification = async (id, receiverId) => {
  const notification = await prisma.notification.findFirst({
    where: { id, receiverId },
  });

  if (!notification) {
    throw new Error("Notification not found");
  }

  return await prisma.notification.delete({
    where: { id },
  });
};

exports.getUnreadCount = async (receiverId) => {
  return await prisma.notification.count({
    where: {
      receiverId,
      isRead: false,
    },
  });
};

exports.markAllRead = async (receiverId) => {
  return await prisma.notification.updateMany({
    where: {
      receiverId,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });
};
