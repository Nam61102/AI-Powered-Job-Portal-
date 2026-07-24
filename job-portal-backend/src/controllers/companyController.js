const prisma = require("../config/prisma");
const { createActivity } = require("../services/activity.service");


// CREATE COMPANY
exports.createCompany = async (req, res) => {
  try {

    const {
      companyName,
      website,
      logo,
    } = req.body;

    const company =
      await prisma.company.create({
        data: {
          companyName,
          website,
          logo,
          userId: req.user.id,
        },
      });

    await createActivity({
      title: "Company Created",
      description: `Company ${company.companyName} was created.`,
      type: "Company Created",
      recruiterId: req.user.id,
    });

    res.status(201).json({
      message: "Company created successfully",
      company,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET ALL COMPANIES
exports.getCompanies = async (req, res) => {
  try {
    const companies = await prisma.company.findMany();
    res.status(200).json({ companies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE COMPANY
exports.getCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await prisma.company.findUnique({ where: { id: Number(id) } });
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.status(200).json({ company });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE COMPANY
exports.updateCompany = async (req, res) => {
  try {

    const {
      companyName,
      website,
      logo,
    } = req.body;

    const { id } = req.params;

    let companyId = id ? Number(id) : null;

    if (!companyId) {
      const company = await prisma.company.findFirst({
        where: {
          userId: req.user.id,
        },
        orderBy: {
          id: "asc",
        },
      });

      if (!company) {
        return res.status(404).json({
          message: "Company not found",
        });
      }

      companyId = company.id;
    }

    const updatedCompany =
      await prisma.company.update({
        where: {
          id: companyId,
        },
        data: {
          companyName,
          website,
          logo,
        },
      });

    await createActivity({
      title: "Company Updated",
      description: `Company ${updatedCompany.companyName} was updated.`,
      type: "Company Updated",
      recruiterId: req.user.id,
    });

    res.json({
      message: "Company updated successfully",
      updatedCompany,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE COMPANY
exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.company.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "Company deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};