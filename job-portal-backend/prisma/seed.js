require("dotenv").config();

const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      name: "Super Admin",
      email: "admin@gmail.com",
      password,
      role: "admin",
    },
  });

  console.log("Admin created successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());