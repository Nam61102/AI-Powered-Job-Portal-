const prisma = require("../config/prisma");
const { createActivity } = require("../services/activity.service");


// CREATE JOB
exports.createJob = async (req, res) => {
  try {

    const {
      title,
      description,
      salary,
      location,
      companyId,
    } = req.body;

    const parsedCompanyId = Number(companyId);

    if (!Number.isInteger(parsedCompanyId)) {
      return res.status(400).json({
        message: "Invalid companyId",
      });
    }

    const company = await prisma.company.findFirst({
      where: {
        id: parsedCompanyId,
        userId: req.user.id,
      },
    });

    if (!company) {
      return res.status(403).json({
        message: "Unauthorized company",
      });
    }

    // Create job
    const job = await prisma.job.create({
      data: {
        title,
        description,
        salary,
        location,
        companyId: parsedCompanyId,
      },
    });

    await createActivity({
      title: "Job Created",
      description: `Job ${job.title} was created.`,
      type: "Job Created",
      recruiterId: req.user.id,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET JOBS
exports.getJobs = async (req, res) => {
  try {

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    // Filters
    const location = req.query.location;
    const minSalary = req.query.minSalary;

    // Query object
    let where = {};

    if (location) {
      where.location = location;
    }

    if (minSalary) {
      where.salary = {
        gte: Number(minSalary),
      };
    }

    // Fetch jobs
    const jobs = await prisma.job.findMany({
      where,

      skip,
      take: limit,

      orderBy: {
        createdAt: "desc",
      },

      include: {
        company: true,
      },
    });

    res.json(jobs);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET SINGLE JOB
exports.getSingleJob = async (req, res) => {
  try {

    const jobId = Number(req.params.id);

    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
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

    res.json(job);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// UPDATE JOB
exports.updateJob = async (req, res) => {
  try {

    const jobId = Number(req.params.id);

    const {
      title,
      description,
      salary,
      location,
    } = req.body;

    const job = await prisma.job.update({
      where: {
        id: jobId,
      },

      data: {
        title,
        description,
        salary,
        location,
      },
    });

    await createActivity({
      title: "Job Updated",
      description: `Job ${job.title} was updated.`,
      type: "Job Updated",
      recruiterId: req.user.id,
    });

    res.json({
      message: "Job updated successfully",
      job,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// DELETE JOB
exports.deleteJob = async (req, res) => {
  try {

    const jobId = Number(req.params.id);

    // First delete all applications associated with this job
    await prisma.application.deleteMany({
      where: {
        jobId: jobId,
      },
    });

    // Then delete the job
    await prisma.job.delete({
      where: {
        id: jobId,
      },
    });

    await createActivity({
      title: "Job Deleted",
      description: `Job ID ${jobId} was deleted.`,
      type: "Job Deleted",
      recruiterId: req.user.id,
    });

    res.json({
      message: "Job deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};