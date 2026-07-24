const prisma = require("../config/prisma");

exports.createActivity = async ({ title, description, type, recruiterId }) => {
  try {
    if (!title || !description || !type || !recruiterId) {
      console.error("Missing required fields for createActivity");
      return null;
    }
    const activity = await prisma.activity.create({
      data: {
        title,
        description,
        type,
        recruiterId: Number(recruiterId),
      },
    });
    return activity;
  } catch (error) {
    console.error("Error creating activity:", error.message);
    // Don't throw, so we don't break the main business logic flow
    return null;
  }
};
