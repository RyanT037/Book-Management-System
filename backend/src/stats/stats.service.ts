import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPublicStats() {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [totalBooks, registeredUsers, recentBooks] = await Promise.all([
      this.prisma.book.count(),
      this.prisma.user.count(),
      this.prisma.book.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    ]);

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

  async getDashboardStats(userId: number) {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [totalBooks, totalUsers, recentBooks] = await Promise.all([
      this.prisma.book.count(),
      this.prisma.user.count(),
      this.prisma.book.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    ]);

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
