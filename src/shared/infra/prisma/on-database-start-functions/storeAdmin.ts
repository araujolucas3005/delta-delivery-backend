import bcrypt from "bcrypt";
import { prisma } from "../prismaClient";

export async function storeAdmin() {
  const admin = await prisma.userManager.findFirst({ where: { id: 1 } });

  if (!admin) {
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD_SEED!,
      5,
    );

    await prisma.userManager.create({
      data: {
        id: 1,
        login: "admin",
        name: "admin",
        password: hashedPassword,
      },
    });
  }

  return admin;
}
