import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';

// Module responsible for administrative user management.
@Module({
  imports: [PrismaModule], // Imports PrismaModule to interact with the database.
  controllers: [UsersController], // Handles incoming HTTP requests for user management.
  providers: [UsersService], // Contains the business logic for user operations.
  exports: [UsersService], // Exports UsersService if other modules need to query user data.
})
export class UsersModule {}
