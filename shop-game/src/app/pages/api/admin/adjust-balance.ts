import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getAdminUserFromSession } from "../../../src/lib/admin";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const admin = await getAdminUserFromSession(req, res);
  if (!admin) return res.status(403).json({ error: "Forbidden" });

  const { email, amount, reason } = req.body;
  if (!email || typeof amount !== "number") return res.status(400).json({ error: "Missing params" });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: "User not found" });

  const newBalance = user.balance + amount;
  if (newBalance < 0) return res.status(400).json({ error: "Insufficient funds" });

  const updated = await prisma.user.update({
    where: { email },
    data: { balance: newBalance }
  });

  // TODO: lưu log hành động admin vào bảng audit
  res.json({ ok: true, updated });
}
