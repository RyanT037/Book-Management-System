import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

// Module responsible for aggregating and providing application-wide statistics.
@Module({
  imports: [AuthModule], // Imports AuthModule to enable JWT authentication guards in the controller.
  controllers: [StatsController], // Handles incoming HTTP requests for statistics.
  providers: [StatsService], // Contains the business logic for calculating statistics.
})
export class StatsModule {}
