const prisma = require("../config/prisma");

exports.getActivities = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    const activities = await prisma.activity.findMany({
      where: {
        recruiterId: recruiterId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({ activities });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
