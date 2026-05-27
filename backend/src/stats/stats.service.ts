import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// Service responsible for aggregating application-wide metrics and statistics.
@Injectable()
export class StatsService {
  constructor(private readonly prisma: PrismaService) {}

  // Calculates statistics intended for public display on the landing page.
  async getPublicStats() {
    // The landing page highlights activity from the most recent 30 days.
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Run independent counts in parallel to keep the stats endpoint fast.
    const [totalBooks, registeredUsers, recentBooks] = await Promise.all([
      this.prisma.book.count(),
      this.prisma.user.count(),
      this.prisma.book.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    ]);

    // Grouping by author name allows us to count unique authors across the platform.
    const activeAuthorsResults = await this.prisma.book.groupBy({
      by: ['author'],
    });

    return {
      totalBooks,
      registeredUsers,
      activeAuthors: activeAuthorsResults.length,
      recentBooks,
    };
  }

  // Calculates statistics for the authenticated user dashboard.
  async getDashboardStats() {
    // The dashboard reuses the same 30-day window for recent activity metrics.
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // These queries do not depend on each other, so they can run together.
    const [totalBooks, totalUsers, recentBooks] = await Promise.all([
      this.prisma.book.count(),
      this.prisma.user.count(),
      this.prisma.book.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    ]);

    // Identify how many unique authors are represented in the system.
    const activeAuthorsResults = await this.prisma.book.groupBy({
      by: ['author'],
    });

    return {
      totalBooks,
      totalUsers,
      activeAuthors: activeAuthorsResults.length,
      recentBooks,
    };
  }
}
