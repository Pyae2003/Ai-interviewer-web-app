import "dotenv/config";

import { prisma } from "@/config";
import { auth } from "@/lib/auth";

async function seedAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME;

  if (!adminEmail || !adminPassword) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required");
  }

  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: adminEmail,
    },
    select: {
      id: true,
    },
  });

  if (existingAdmin) {
    console.log("✅ Admin already exists. Skipping seed.");
    return;
  }

  await auth.api.signUpEmail({
    body: {
      email: adminEmail, // required
      password: adminPassword, // required
      name: adminName as string, // required
      role: "ADMIN",
    },
  });

  console.log("✅ Admin account created successfully");
}

seedAdmin()
  .catch((error) => {
    console.error("❌ Admin seed failed", error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
