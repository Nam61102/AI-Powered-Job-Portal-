const prisma = require("../config/prisma");

exports.scheduleInterview = async (data) => {
  return await prisma.interview.create({
    data,
  });
};

exports.getRecruiterInterviews = async (recruiterId) => {
  return await prisma.interview.findMany({
    where: {
      application: {
        job: {
          company: {
            userId: recruiterId,
          },
        },
      },
    },
    include: {
      application: {
        include: {
          candidate: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          job: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
    },
    orderBy: {
      interviewDate: "asc",
    },
  });
};

exports.getCandidateInterviews = async (candidateId) => {
  return await prisma.interview.findMany({
    where: {
      application: {
        candidateId,
      },
    },
    include: {
      application: {
        include: {
          job: {
            include: {
              company: true,
            },
          },
        },
      },
    },
    orderBy: {
      interviewDate: "asc",
    },
  });
};

exports.getInterviewById = async (id) => {
  return await prisma.interview.findUnique({
    where: { id },
    include: {
      application: {
        include: {
          candidate: true,
          job: {
            include: {
              company: true,
            },
          },
        },
      },
    },
  });
};

exports.updateInterview = async (id, data) => {
  return await prisma.interview.update({
    where: { id },
    data,
  });
};

exports.cancelInterview = async (id) => {
  return await prisma.interview.update({
    where: { id },
    data: { status: "CANCELLED" },
  });
};
