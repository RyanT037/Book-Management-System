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
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import type { Request } from 'express';
import { Role } from 'src/generated/prisma/browser';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

// Defines the shape of the request containing the user payload from the JWT guard
type AuthRequest = Request & {
  user: { id: number; email: string; role?: Role };
};

@ApiTags('Books')
@ApiBearerAuth('bearer')
@ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({
    summary: 'Create a new book',
    description: 'Creates a book record linked to the authenticated user.',
  })
  @ApiBody({ type: CreateBookDto })
  @ApiCreatedResponse({
    description: 'Book created successfully.',
    schema: {
      example: {
        id: 1,
        title: 'Clean Code',
        author: 'Robert C. Martin',
        isbn: '9780132350884',
        publishedYear: 2008,
        description:
          'A practical guide to writing readable and maintainable code.',
        userId: 1,
        createdAt: '2026-05-27T08:00:00.000Z',
        updatedAt: '2026-05-27T08:00:00.000Z',
      },
    },
  })
  create(@Body() dto: CreateBookDto, @Req() req: AuthRequest) {
    return this.booksService.create(dto, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({
    summary: 'Get all books',
    description: 'Returns all book records ordered by newest first.',
  })
  @ApiOkResponse({
    description: 'List of books.',
    schema: {
      example: [
        {
          id: 1,
          title: 'Clean Code',
          author: 'Robert C. Martin',
          isbn: '9780132350884',
          publishedYear: 2008,
          description:
            'A practical guide to writing readable and maintainable code.',
          userId: 1,
          createdAt: '2026-05-27T08:00:00.000Z',
          updatedAt: '2026-05-27T08:00:00.000Z',
        },
      ],
    },
  })
  findAll(@Req() req: AuthRequest) {
    // All users can view all books
    return this.booksService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({
    summary: 'Get one book by id',
    description: 'Returns a single book record by its numeric id.',
  })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({
    description: 'Book found.',
    schema: {
      example: {
        id: 1,
        title: 'Clean Code',
        author: 'Robert C. Martin',
        isbn: '9780132350884',
        publishedYear: 2008,
        description:
          'A practical guide to writing readable and maintainable code.',
        userId: 1,
        createdAt: '2026-05-27T08:00:00.000Z',
        updatedAt: '2026-05-27T08:00:00.000Z',
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Book was not found.' })
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: AuthRequest) {
    return this.booksService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiOperation({
    summary: 'Update a book by id',
    description:
      'Updates a book record. Only the book owner or an admin can update it.',
  })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiBody({ type: UpdateBookDto })
  @ApiOkResponse({
    description: 'Book updated successfully.',
    schema: {
      example: {
        id: 1,
        title: 'Clean Code, Second Edition',
        author: 'Robert C. Martin',
        isbn: '9780132350884',
        publishedYear: 2008,
        description: 'Updated notes for a software craftsmanship classic.',
        userId: 1,
        createdAt: '2026-05-27T08:00:00.000Z',
        updatedAt: '2026-05-27T09:30:00.000Z',
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Book was not found.' })
  @ApiForbiddenResponse({
    description: 'Only the book owner or an admin can update the book.',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBookDto,
    @Req() req: AuthRequest,
  ) {
    return this.booksService.update(
      id,
      dto,
      req.user.id,
      req.user.role as Role,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a book by id',
    description: 'Deletes a book record. Only admins can delete books.',
  })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({
    description: 'Book deleted successfully.',
    schema: { example: { message: 'Book 1 deleted successfully' } },
  })
  @ApiNotFoundResponse({ description: 'Book was not found.' })
  @ApiForbiddenResponse({ description: 'Only admins can delete books.' })
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: AuthRequest) {
    return this.booksService.remove(id, req.user.role as Role);
  }
}
