import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getAdminUserFromSession } from "../../../src/lib/admin";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Chỉ POST
  if (req.method !== "POST") return res.status(405).end();

  const admin = await getAdminUserFromSession(req, res);
  if (!admin) return res.status(403).json({ error: "Forbidden" });

  const { email, reason } = req.body;
  if (!email) return res.status(400).json({ error: "Missing email" });

  const user = await prisma.user.update({
    where: { email },
    data: { banned: true, bannedReason: reason ?? "Banned by admin" }
  });

  // TODO: log action vào bảng audit nếu cần

  res.json({ ok: true, user });
}
