const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const email = "admin@example.com";
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    console.log("Admin already exists:", email);
    return;
  }
  const hash = await bcrypt.hash("StrongAdminPassword123!", 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hash,
      name: "Super Admin",
      isAdmin: true,
      balance: 0
    }
  });
  console.log("Created admin:", user.email);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
