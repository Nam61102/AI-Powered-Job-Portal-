const uploadToCloudinary = require("../utils/uploadToCloudinary");
const prisma = require("../config/prisma");
const { createActivity } = require("../services/activity.service");
const pdf = require("pdf-parse");

// Upload Resume
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File required" });
    }

    let resumeText = null;
    try {
      const data = await pdf(req.file.buffer);
      resumeText = data.text;
    } catch (e) {
      console.error("Failed to parse PDF:", e);
    }

    const result = await uploadToCloudinary(req.file.buffer, "resumes");

    // Check if profile exists before updating
    const existingProfile = await prisma.candidateProfile.findUnique({
      where: { userId: req.user.id },
    });

    if (existingProfile) {
      await prisma.candidateProfile.update({
        where: { userId: req.user.id },
        data: { 
          resumeUrl: result.secure_url,
          resumeText: resumeText
        },
      });
    }

    res.json({ message: "Resume uploaded", url: result.secure_url, text: resumeText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.uploadLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File required" });
    }

    const result = await uploadToCloudinary(req.file.buffer, "logos");

    const { companyId } = req.body;
    if (!companyId) {
      return res.status(400).json({ message: "Company ID required" });
    }

    const company = await prisma.company.findFirst({
      where: { id: parseInt(companyId), userId: req.user.id },
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found or unauthorized" });
    }

    await prisma.company.update({
      where: { id: company.id },
      data: { logo: result.secure_url },
    });

    await createActivity({
      title: "Company Logo Uploaded",
      description: "Company logo was updated.",
      type: "Logo Uploaded",
      recruiterId: req.user.id,
    });

    res.json({ message: "Logo uploaded", url: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File required" });
    }

    const result = await uploadToCloudinary(req.file.buffer, "profile_pictures");

    await prisma.candidateProfile.update({
      where: { userId: req.user.id },
      data: { profilePicture: result.secure_url },
    });

    res.json({ message: "Profile picture uploaded", url: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.parseResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File required" });
    }
    
    let data;
    try {
      data = await pdf(req.file.buffer);
    } catch (e) {
      return res.status(400).json({ message: "Failed to parse PDF." });
    }

    const text = data.text;
    
    const mockSkills = [];
    if (text.toLowerCase().includes("react")) mockSkills.push("React");
    if (text.toLowerCase().includes("javascript")) mockSkills.push("JavaScript");
    if (text.toLowerCase().includes("node")) mockSkills.push("Node.js");
    if (text.toLowerCase().includes("typescript")) mockSkills.push("TypeScript");
    if (text.toLowerCase().includes("next")) mockSkills.push("Next.js");
    if (text.toLowerCase().includes("tailwind")) mockSkills.push("TailwindCSS");
    if (text.toLowerCase().includes("python")) mockSkills.push("Python");
    
    const mockEducation = text.toLowerCase().includes("bachelor") ? "Bachelor of Science" : "";

    res.json({
      message: "Resume parsed successfully",
      parsedData: {
        skills: mockSkills.join(", "),
        education: mockEducation,
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};