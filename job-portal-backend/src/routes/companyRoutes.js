const express = require("express");

const router = express.Router();

const companyController = require("../controllers/companyController");

const { authMiddleware } = require("../middleware/authMiddleware");

const { roleMiddleware } = require("../middleware/roleMiddleware");


// CREATE COMPANY (alias /create and /)
router.post(
  "/create",
  authMiddleware,
  roleMiddleware("recruiter"),
  companyController.createCompany
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("recruiter"),
  companyController.createCompany
);

// READ ALL
router.get("/", companyController.getCompanies);

// READ ONE
router.get("/:id", companyController.getCompany);

// UPDATE
router.put("/update", authMiddleware, roleMiddleware("recruiter"), companyController.updateCompany);

router.put("/:id", authMiddleware, roleMiddleware("recruiter"), companyController.updateCompany);

// DELETE
router.delete("/:id", authMiddleware, roleMiddleware("recruiter"), companyController.deleteCompany);

module.exports = router;