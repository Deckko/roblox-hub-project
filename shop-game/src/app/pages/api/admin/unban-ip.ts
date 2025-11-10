import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getAdminUserFromSession } from "../../../src/lib/admin";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const admin = await getAdminUserFromSession(req, res);
  if (!admin) return res.status(403).json({ error: "Forbidden" });

  const { ip } = req.body;
  if (!ip) return res.status(400).json({ error: "Missing ip" });

  await prisma.bannedIp.deleteMany({ where: { ip } });

  res.json({ ok: true });
}
