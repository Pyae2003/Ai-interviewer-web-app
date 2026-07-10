import { env, prisma } from "@/config";
import { auth } from "@/lib/auth";
import { seedCategories } from "./seedCategories";

async function seedAdmin() {
  const adminEmail = env.ADMIN_EMAIL;
  const adminPassword = env.ADMIN_PASSWORD;
  const adminName = env.ADMIN_NAME ?? "System Admin";

  if (!adminEmail || !adminPassword) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required");
  }

  console.log("🔍 Checking admin account...");

  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: adminEmail,
    },
    select: {
      id: true,
      role: true,
    },
  });


  if (existingAdmin) {
    console.log(`✅ Admin already exists (${adminEmail})`);

    return;
  }

  console.log("🚀 Creating admin account...");

  const createdUser = await auth.api.signUpEmail({
    body: {
      name: adminName,
      email: adminEmail,
      password: adminPassword,
    },
  });

  if (!createdUser?.user?.id) {
    throw new Error("Failed to create admin user");
  }
  
  await prisma.user.update({
    where: {
      id: createdUser.user.id,
    },
    data: {
      role: "admin",
    },
  });

  console.log(`✅ Admin created successfully (${adminEmail})`);
}

async function main() {
  await seedAdmin();
}

main()
  .then(async() => {
    await seedCategories();
  })
  .catch((error) => {
    console.error("❌ Seed failed", error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
