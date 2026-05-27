import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { StatsService } from './stats.service';

// Controller for retrieving application-wide statistics.
// Provides both public data for the landing page and protected data for the dashboard.
@ApiTags('Statistics')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  // Public endpoint to show platform growth and activity to visitors.
  @Get('public')
  @ApiOperation({
    summary: 'Get public landing page statistics',
    description:
      'Returns public application totals used by the landing page. No authentication is required.',
  })
  @ApiOkResponse({
    description: 'Public statistics returned successfully.',
    schema: {
      example: {
        totalBooks: 120,
        registeredUsers: 35,
        activeAuthors: 48,
        recentBooks: 12,
      },
    },
  })
  getPublicStats() {
    return this.statsService.getPublicStats();
  }

  // Protected endpoint for the user dashboard.
  @UseGuards(AuthGuard('jwt'))
  @Get('dashboard')
  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary: 'Get dashboard statistics for authenticated users',
    description:
      'Returns dashboard totals for authenticated users. Requires a valid JWT bearer token.',
  })
  @ApiOkResponse({
    description: 'Dashboard statistics returned successfully.',
    schema: {
      example: {
        totalBooks: 120,
        totalUsers: 35,
        activeAuthors: 48,
        recentBooks: 12,
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
  getDashboardStats() {
    // Dashboard stats are currently global totals for every authenticated user.
    return this.statsService.getDashboardStats();
  }
}
