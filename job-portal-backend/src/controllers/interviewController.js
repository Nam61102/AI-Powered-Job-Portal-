const interviewService = require("../services/interview.service");
const prisma = require("../config/prisma");
const { createNotification } = require("../utils/createNotification");
const { NOTIFICATION_TYPES } = require("../constants/notification.constants");
const { createActivity } = require("../services/activity.service");

exports.scheduleInterview = async (req, res) => {
  try {
    const { applicationId, interviewDate, mode, meetingLink, address, notes } = req.body;

    const parsedAppId = parseInt(applicationId, 10);
    if (isNaN(parsedAppId) || !interviewDate || !mode) {
      return res.status(400).json({ success: false, message: "applicationId, interviewDate, and mode are required" });
    }

    if (mode === "ONLINE" && !meetingLink) {
      return res.status(400).json({ success: false, message: "meetingLink is required for ONLINE mode" });
    }

    if (mode === "OFFLINE" && !address) {
      return res.status(400).json({ success: false, message: "address is required for OFFLINE mode" });
    }

    // Verify application and ownership
    const application = await prisma.application.findUnique({
      where: { id: parsedAppId },
      include: { job: { include: { company: true } }, candidate: true },
    });

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    if (application.job.company.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized to schedule for this application" });
    }

    // Create interview
    const interview = await interviewService.scheduleInterview({
      applicationId: parsedAppId,
      interviewDate: new Date(interviewDate),
      mode,
      meetingLink,
      address,
      notes,
    });

    // Update application status
    await prisma.application.update({
      where: { id: parsedAppId },
      data: { status: "INTERVIEW" },
    });

    // Notify candidate
    const dateStr = new Date(interviewDate).toLocaleString();
    const locationText = mode === "OFFLINE" ? ` Office Address: ${address}.` : ` Meeting Link: ${meetingLink}.`;
    await createNotification(
      application.candidateId,
      "Interview Scheduled",
      `Your interview for ${application.job.title} has been scheduled on ${dateStr}. Mode: ${mode}.${locationText}`,
      NOTIFICATION_TYPES.INTERVIEW
    );

    // Create activity
    await createActivity({
      title: "Interview Scheduled",
      description: `Scheduled interview for candidate on ${dateStr}`,
      type: "Interview",
      recruiterId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Interview scheduled successfully",
      interview,
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ success: false, message: "An interview is already scheduled for this application" });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getInterviews = async (req, res) => {
  try {
    const recruiterId = req.user.id;
    const interviews = await interviewService.getRecruiterInterviews(recruiterId);
    res.json({ success: true, interviews });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getMyInterviews = async (req, res) => {
  try {
    const candidateId = req.user.id;
    const interviews = await interviewService.getCandidateInterviews(candidateId);
    res.json({ success: true, interviews });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getInterview = async (req, res) => {
  try {
    const interviewId = parseInt(req.params.id, 10);
    if (isNaN(interviewId)) {
      return res.status(400).json({ success: false, message: "Invalid interview ID" });
    }

    const interview = await interviewService.getInterviewById(interviewId);
    if (!interview) {
      return res.status(404).json({ success: false, message: "Interview not found" });
    }

    // Authorization
    const isCandidate = interview.application.candidateId === req.user.id;
    const isRecruiter = interview.application.job.company.userId === req.user.id;

    if (!isCandidate && !isRecruiter) {
      return res.status(403).json({ success: false, message: "Not authorized to view this interview" });
    }

    res.json({ success: true, interview });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateInterview = async (req, res) => {
  try {
    const { interviewDate, mode, meetingLink, address, notes, status } = req.body;
    
    if (mode === "ONLINE" && !meetingLink) {
      return res.status(400).json({ success: false, message: "meetingLink is required for ONLINE mode" });
    }
    if (mode === "OFFLINE" && !address) {
      return res.status(400).json({ success: false, message: "address is required for OFFLINE mode" });
    }

    const interviewId = parseInt(req.params.id, 10);
    if (isNaN(interviewId)) {
      return res.status(400).json({ success: false, message: "Invalid interview ID" });
    }

    const interview = await interviewService.getInterviewById(interviewId);
    if (!interview) {
      return res.status(404).json({ success: false, message: "Interview not found" });
    }

    if (interview.application.job.company.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const data = {};
    let rescheduled = false;
    if (interviewDate) {
      data.interviewDate = new Date(interviewDate);
      if (interview.interviewDate.getTime() !== data.interviewDate.getTime()) {
        rescheduled = true;
      }
    }
    if (mode) data.mode = mode;
    if (meetingLink !== undefined) data.meetingLink = meetingLink;
    if (address !== undefined) data.address = address;
    if (notes !== undefined) data.notes = notes;
    if (status) data.status = status;

    const updatedInterview = await interviewService.updateInterview(interviewId, data);

    if (rescheduled) {
      const dateStr = updatedInterview.interviewDate.toLocaleString();
      const locationText = updatedInterview.mode === "OFFLINE" ? ` Office Address: ${updatedInterview.address}.` : ` Meeting Link: ${updatedInterview.meetingLink}.`;
      await createNotification(
        interview.application.candidateId,
        "Interview Rescheduled",
        `Your interview for ${interview.application.job.title} has been rescheduled to ${dateStr}. Mode: ${updatedInterview.mode}.${locationText}`,
        NOTIFICATION_TYPES.INTERVIEW
      );
    }

    res.json({ success: true, message: "Interview updated", interview: updatedInterview });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.cancelInterview = async (req, res) => {
  try {
    const interviewId = parseInt(req.params.id, 10);
    if (isNaN(interviewId)) {
      return res.status(400).json({ success: false, message: "Invalid interview ID" });
    }

    const interview = await interviewService.getInterviewById(interviewId);
    if (!interview) {
      return res.status(404).json({ success: false, message: "Interview not found" });
    }

    if (interview.application.job.company.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await interviewService.cancelInterview(interviewId);

    await createNotification(
      interview.application.candidateId,
      "Interview Cancelled",
      `Your interview for ${interview.application.job.title} has been cancelled.`,
      NOTIFICATION_TYPES.INTERVIEW
    );

    res.json({ success: true, message: "Interview cancelled" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
