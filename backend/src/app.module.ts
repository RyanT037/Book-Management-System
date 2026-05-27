import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { BooksModule } from './books/books.module';
import { StatsModule } from './stats/stats.module';

// The root module of the application that orchestrates all feature modules.
@Module({
  imports: [
    // Load environment variables from .env file and make them available globally.
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,   // Handles authentication and JWT issuance.
    UsersModule,  // Manages user profiles and administrative tasks.
    PrismaModule, // Provides the database client (Global).
    BooksModule,  // Manages the book catalog and ownership.
    StatsModule,  // Aggregates data for landing pages and dashboards.
  ],
  controllers: [AppController], // Root-level endpoints (e.g., health checks).
  providers: [AppService],     // Logic for root-level operations.
})
export class AppModule {}
