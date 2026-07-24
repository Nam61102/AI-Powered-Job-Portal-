const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    await prisma.application.findMany();
    console.log("Apps fetched successfully");
    await prisma.interview.findMany();
    console.log("Interviews fetched successfully");
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}
main();
