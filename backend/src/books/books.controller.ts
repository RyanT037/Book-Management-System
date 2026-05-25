import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

// Defines the shape of the request containing the user payload from the JWT guard
type AuthRequest = Request & { user: { id: number; email: string } };

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateBookDto, @Req() req: AuthRequest) {
    return this.booksService.create(dto, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Req() req: AuthRequest) {
    // Simplified: No pagination query parsing needed anymore
    return this.booksService.findAll(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: AuthRequest) {
    return this.booksService.findOne(id, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBookDto,
    @Req() req: AuthRequest,
  ) {
    return this.booksService.update(id, dto, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: AuthRequest) {
    return this.booksService.remove(id, req.user.id);
  }
}