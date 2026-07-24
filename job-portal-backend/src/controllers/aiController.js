const { getResumeMatchData } = require("../services/ai.service");

/**
 * Controller to handle AI Resume Match requests.
 * Responsibilities:
 * - Read req.user.id and req.body.jobId
 * - Validate input
 * - Call service layer
 * - Send response
 */
const resumeMatch = async (req, res) => {
  try {
    // 1. Read the authenticated user's ID from req.user
    const userId = req.user.id;
    
    // 2. Read the jobId from the request body
    const jobId = req.body.jobId;

    // 3. Validate that jobId exists in the request body
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "jobId is required in the request body."
      });
    }

    // 4. Call the service to fetch candidate and job data
    // No Prisma queries are written here, maintaining clean architecture
    const { candidate, job } = await getResumeMatchData(userId, jobId);

    // 5. Return the expected success response with both candidate and job objects
    return res.status(200).json({
      success: true,
      candidate,
      job
    });
  } catch (error) {
    console.error("Error in resumeMatch:", error);
    
    // Check if the error has a specific status code (e.g., 404 from service)
    const statusCode = error.statusCode || 500;
    
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};

module.exports = {
  resumeMatch
};
