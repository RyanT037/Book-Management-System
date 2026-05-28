import 'dotenv/config';

import { Role } from 'src/generated/prisma/browser';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '../src/generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const admins = [
    {
      name: 'Main Admin',
      username: 'mainadmin',
      email: process.env.ADMIN_ONE_EMAIL!,
      password: process.env.ADMIN_ONE_PASSWORD!,
    },
    {
      name: 'IT Admin',
      username: 'ITSupport',
      email: process.env.ADMIN_TWO_EMAIL!,
      password: process.env.ADMIN_TWO_PASSWORD!,
    },
  ];

  for (const admin of admins) {
    const hashedPassword = await bcrypt.hash(admin.password, 10);

    await prisma.user.upsert({
      where: {
        email: admin.email,
      },
      update: {},
      create: {
        name: admin.name,
        username: admin.username,
        email: admin.email,
        password: hashedPassword,
        role: Role.ADMIN,
      },
    });

    console.log(`${admin.email} seeded`);
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });