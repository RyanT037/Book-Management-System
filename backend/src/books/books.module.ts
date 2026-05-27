import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';

// Module responsible for managing book-related functionality.
@Module({
  imports: [AuthModule], // Imports AuthModule to enable JWT authentication guards in the controller.
  controllers: [BooksController], // Handles incoming HTTP requests for books.
  providers: [BooksService], // Contains the business logic for book operations.
})
export class BooksModule {}
