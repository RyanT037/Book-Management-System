import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('public')
  getPublicStats() {
    return this.statsService.getPublicStats();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('dashboard')
  getDashboardStats(@Request() req: { user: { id: number } }) {
    return this.statsService.getDashboardStats(req.user.id);
  }
}
