import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// The PrismaService extends PrismaClient to provide a database connection throughout the app.
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // Initialize the PostgreSQL adapter using the connection string from environment variables.
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });

    super({ adapter });
  }

  // Connect to the database when the module is initialized.
  async onModuleInit() {
    await this.$connect();
  }
}
