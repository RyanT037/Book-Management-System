import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';

@Module({
  imports: [AuthModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
