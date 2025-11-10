import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]"; // đường dẫn theo project
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function getAdminUserFromSession(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) return null;
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return null;
  if (!user.isAdmin) return null;
  return user;
}
