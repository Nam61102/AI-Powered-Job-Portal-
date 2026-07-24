const prisma = require("../config/prisma");
const { createNotification } = require("../utils/createNotification");
const { NOTIFICATION_TYPES } = require("../constants/notification.constants");


exports.getUsers = async (req, res) => {
  try {

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isBlocked: true
      }
    });

    res.json(users);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        company: true
      }
    });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: parseInt(id, 10) }
    });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.toggleBlockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isBlocked: !user.isBlocked }
    });

    if (updatedUser.isBlocked) {
      await createNotification(
        updatedUser.id,
        "Account Blocked",
        "Your account has been blocked by an administrator.",
        NOTIFICATION_TYPES.BLOCKED
      );
    }

    res.json({ message: "User block status updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Note: job listing and user deletion are implemented above.

exports.postAnnouncement = async (req, res) => {
  try {
    const { title, message, targetUsers } = req.body;
    // targetUsers can be 'all', 'candidate', or 'recruiter'

    let whereClause = {};
    if (targetUsers === 'candidate' || targetUsers === 'recruiter') {
      whereClause.role = targetUsers;
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      select: { id: true }
    });

    const notifications = users.map(user => 
      createNotification(
        user.id,
        title,
        message,
        NOTIFICATION_TYPES.ANNOUNCEMENT
      )
    );

    await Promise.all(notifications);

    res.status(201).json({
      success: true,
      message: `Announcement sent to ${users.length} users.`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};