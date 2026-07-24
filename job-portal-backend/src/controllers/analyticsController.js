const { getRecruiterAnalyticsData } = require("../services/analytics.service");

exports.getRecruiterAnalytics = async (req, res) => {
  try {
    const analytics = await getRecruiterAnalyticsData(req.user.id);

    res.status(200).json(analytics);
  } catch (error) {
    if (error.message === "Company not found") {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
