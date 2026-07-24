const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.$executeRaw`TRUNCATE TABLE "Notification" CASCADE`;
  console.log("Truncated Notification table");
}
main().catch(console.error).finally(() => prisma.$disconnect());
