const prisma = require("../config/prisma");


// CREATE PROFILE
exports.createProfile = async (req, res) => {
  try {

    const {
      skills,
      education,
      experience,
      resumeUrl,
      resumeText,
      workExperiences,
      certifications,
      languages,
      socialLinks,
      bio,
      profilePicture,
    } = req.body;

    // Check existing profile
    const existingProfile =
      await prisma.candidateProfile.findUnique({
        where: {
          userId: req.user.id,
        },
      });

    if (existingProfile) {
      return res.status(400).json({
        message: "Profile already exists",
      });
    }

    // Create profile
    const profile =
      await prisma.candidateProfile.create({
        data: {
          skills,
          education,
          experience,
          resumeUrl,
          resumeText,
          workExperiences,
          certifications,
          languages,
          socialLinks,
          bio,
          profilePicture,
          userId: req.user.id,
        },
      });

    res.status(201).json({
      message: "Profile created successfully",
      profile,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET PROFILE
exports.getProfile = async (req, res) => {
  try {

    const profile =
      await prisma.candidateProfile.findUnique({
        where: {
          userId: req.user.id,
        },
      });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.json(profile);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {

    const {
      skills,
      education,
      experience,
      resumeUrl,
      resumeText,
      workExperiences,
      certifications,
      languages,
      socialLinks,
      bio,
      profilePicture,
    } = req.body;

    const updatedProfile =
      await prisma.candidateProfile.update({
        where: {
          userId: req.user.id,
        },
        data: {
          skills,
          education,
          experience,
          resumeUrl,
          resumeText,
          workExperiences,
          certifications,
          languages,
          socialLinks,
          bio,
          profilePicture,
        },
      });

    res.json({
      message: "Profile updated successfully",
      updatedProfile,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};