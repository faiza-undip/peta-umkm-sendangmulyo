import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function getArg(flag: string): string | undefined {
  const prefix = `--${flag}=`;
  const found = process.argv.find((a) => a.startsWith(prefix));
  return found?.slice(prefix.length);
}

async function main() {
  const name = getArg("name");
  const email = getArg("email")?.trim().toLowerCase();
  const password = getArg("password");

  if (!name || !email || !password) {
    console.error(
      'Pemakaian: npm run admin:create -- --name="Nama Admin" --email="admin@email.com" --password="katasandi-kuat"',
    );
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("Kata sandi minimal 8 karakter.");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { name, passwordHash },
    create: { name, email, passwordHash },
  });

  console.log(`Admin siap dipakai: ${admin.name} <${admin.email}>`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });