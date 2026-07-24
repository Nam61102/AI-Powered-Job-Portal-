const prisma = require("../config/prisma");

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getRecruiterAnalyticsData = async (userId) => {
  const companies = await prisma.company.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });

  if (!companies || companies.length === 0) {
    const error = new Error("Company not found");
    error.statusCode = 404;
    throw error;
  }

  const companyIds = companies.map((company) => company.id);

  const [jobs, totalApplications, pending, shortlisted, rejected, hired] = await Promise.all([
    prisma.job.findMany({
      where: {
        companyId: { in: companyIds },
      },
      select: {
        id: true,
        title: true,
        _count: {
          select: {
            applications: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.application.count({
      where: {
        job: {
          companyId: { in: companyIds },
        },
      },
    }),
    prisma.application.count({
      where: {
        job: {
          companyId: { in: companyIds },
        },
        status: { equals: "pending", mode: "insensitive" },
      },
    }),
    prisma.application.count({
      where: {
        job: {
          companyId: { in: companyIds },
        },
        status: { equals: "shortlisted", mode: "insensitive" },
      },
    }),
    prisma.application.count({
      where: {
        job: {
          companyId: { in: companyIds },
        },
        status: { equals: "rejected", mode: "insensitive" },
      },
    }),
    prisma.application.count({
      where: {
        job: {
          companyId: { in: companyIds },
        },
        status: { equals: "hired", mode: "insensitive" },
      },
    }),
  ]);

  const applications = await prisma.application.findMany({
    where: {
      job: {
        companyId: { in: companyIds },
      },
    },
    select: {
      id: true,
      status: true,
      createdAt: true,
      job: {
        select: {
          title: true,
        },
      },
      candidate: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((job) => job._count.applications > 0).length;
  const closedJobs = totalJobs - activeJobs;

  const topJob = jobs.length
    ? jobs.reduce((prev, current) => {
        const prevCount = prev._count.applications;
        const currentCount = current._count.applications;
        return currentCount > prevCount ? current : prev;
      })
    : null;

  const recentApplications = applications.slice(0, 5).map((application) => ({
    candidateName: application.candidate?.name || "Unknown Candidate",
    jobTitle: application.job?.title || "Unknown Job",
    status: application.status,
    appliedAt: application.createdAt,
  }));

  const applicationsPerMonth = monthNames.map((month, index) => ({
    month,
    count: applications.filter((application) => new Date(application.createdAt).getMonth() === index).length,
  }));

  return {
    overview: {
      totalJobs,
      activeJobs,
      closedJobs,
      totalApplications,
      pending,
      shortlisted,
      rejected,
      hired,
    },
    topJob: topJob
      ? {
          id: topJob.id,
          title: topJob.title,
          applications: topJob._count.applications,
        }
      : {
          id: null,
          title: null,
          applications: 0,
        },
    recentApplications,
    applicationsPerMonth,
  };
};

module.exports = {
  getRecruiterAnalyticsData,
};
