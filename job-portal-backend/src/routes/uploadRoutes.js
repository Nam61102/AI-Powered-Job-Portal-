const express = require("express");

const router = express.Router();

const upload =
  require("../middleware/uploadMiddleware");

const {
  authMiddleware,
} = require("../middleware/authMiddleware");

const {
  roleMiddleware,
} = require("../middleware/roleMiddleware");

const {
  uploadResume,
  uploadLogo,
  uploadProfilePicture,
  parseResume,
} = require("../controllers/uploadController");


// Resume Upload
router.post(
  "/resume",
  authMiddleware,
  roleMiddleware("candidate"),
  upload.single("file"),
  uploadResume
);


// Logo Upload
router.post(
  "/logo",
  authMiddleware,
  roleMiddleware("recruiter"),
  upload.single("file"),
  uploadLogo
);

// Profile Picture Upload
router.post(
  "/profile-picture",
  authMiddleware,
  roleMiddleware("candidate"),
  upload.single("file"),
  uploadProfilePicture
);

// Resume Parsing
router.post(
  "/parse-resume",
  authMiddleware,
  roleMiddleware("candidate"),
  upload.single("file"),
  parseResume
);

module.exports = router;