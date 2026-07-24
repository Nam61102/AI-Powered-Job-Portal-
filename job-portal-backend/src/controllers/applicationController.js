const prisma = require("../config/prisma");
const { createActivity } = require("../services/activity.service");
const { createNotification } = require("../utils/createNotification");
const { NOTIFICATION_TYPES } = require("../constants/notification.constants");



// APPLY JOB
exports.applyJob = async (req, res) => {
  try {

    const { jobId } = req.body;
    const parsedJobId = Number(jobId);

    if (!Number.isInteger(parsedJobId)) {
      return res.status(400).json({
        message: "Invalid jobId",
      });
    }

    // Check job exists
    const job = await prisma.job.findUnique({
      where: {
        id: parsedJobId,
      },
      include: {
        company: true,
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Check already applied
    const existingApplication =
      await prisma.application.findFirst({
        where: {
          jobId: parsedJobId,
          candidateId: req.user.id,
        },
      });

    if (existingApplication) {
      return res.status(400).json({
        message: "Already applied",
      });
    }

    // Create application
    const application =
      await prisma.application.create({
        data: {
          jobId: parsedJobId,
          candidateId: req.user.id,
          status: "pending",
        },
      });

    // Notify recruiter
    if (job.company && job.company.userId) {
      await createNotification(
        job.company.userId,
        "New Application Received",
        `A candidate has applied for your job: ${job.title}`,
        NOTIFICATION_TYPES.APPLICATION
      );
    }

    res.status(201).json({
      message: "Job applied successfully",
      application,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getMyApplications = async (req, res) => {
  try {

    const applications =
      await prisma.application.findMany({
        where: {
          candidateId: req.user.id,
        },

        include: {
          job: {
            include: {
              company: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    res.json(applications);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getApplicantsForJob = async (
  req,
  res
) => {
  try {

    const { jobId } = req.params;
    const parsedJobId = Number(jobId);

    if (!Number.isInteger(parsedJobId)) {
      return res.status(400).json({
        message: "Invalid jobId",
      });
    }

    const applications =
      await prisma.application.findMany({
        where: {
          jobId: parsedJobId,
        },

        include: {
          candidate: {
            include: {
              candidateProfile: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    res.json(applications);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateApplicationStatus = async (
  req,
  res
) => {
  try {

    const { applicationId, status } = req.body;
    const parsedApplicationId = Number(applicationId);

    if (!Number.isInteger(parsedApplicationId)) {
      return res.status(400).json({
        message: "Invalid applicationId",
      });
    }

    const updatedApplication =
      await prisma.application.update({
        where: {
          id: parsedApplicationId,
        },

        data: {
          status,
        },
      });

    let activityTitle = "";
    const normalizedStatus = status.toLowerCase();
    
    if (normalizedStatus === "pending") activityTitle = "Application Pending";
    else if (normalizedStatus === "screening") activityTitle = "Candidate Screening";
    else if (normalizedStatus === "shortlisted") activityTitle = "Candidate Shortlisted";
    else if (normalizedStatus === "interview") activityTitle = "Candidate Interview";
    else if (normalizedStatus === "accepted") activityTitle = "Candidate Accepted";
    else if (normalizedStatus === "rejected") activityTitle = "Candidate Rejected";
    else if (normalizedStatus === "hired") activityTitle = "Candidate Hired";

    if (activityTitle) {
      await createActivity({
        title: activityTitle,
        description: `Candidate application status updated to ${status}.`,
        type: activityTitle,
        recruiterId: req.user.id,
      });
    }

    // Notify candidate
    let notificationType;
    if (normalizedStatus === "shortlisted") notificationType = NOTIFICATION_TYPES.SHORTLISTED;
    else if (normalizedStatus === "rejected") notificationType = NOTIFICATION_TYPES.REJECTED;
    else if (normalizedStatus === "hired") notificationType = NOTIFICATION_TYPES.HIRED;
    else if (normalizedStatus === "interview") notificationType = NOTIFICATION_TYPES.INTERVIEW;

    if (notificationType) {
      const jobDetails = await prisma.job.findUnique({
        where: { id: updatedApplication.jobId }
      });
      const jobTitle = jobDetails ? jobDetails.title : "a job";
      
      await createNotification(
        updatedApplication.candidateId,
        "Application Status Updated",
        `Your application for ${jobTitle} has been marked as ${status}.`,
        notificationType
      );
    }

    res.json({
      message: "Application status updated",
      updatedApplication,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};