import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from 'src/generated/prisma/browser';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  // 1. Create a new book mapping exactly to the DTO and your exam requirements
  create(dto: CreateBookDto, userId: number) {
    return this.prisma.book.create({
      data: {
        title: dto.title,
        author: dto.author,
        isbn: dto.isbn,
        publishedYear: dto.publishedYear,
        description: dto.description,
        userId, // Keeps books isolated to authenticated users
      },
    });
  }

  // 2. Retrieve all books in the DB (all users can view all books)
  findAll() {
    return this.prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // 3. Retrieve a single book safely
  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({ where: { id } });

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  // 4. Update a book directly using fields passed in the DTO
  async update(id: number, dto: UpdateBookDto, userId: number, role: Role) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);

    // Allow update only for owner or admin
    if (book.userId !== userId && role !== Role.ADMIN) {
      throw new ForbiddenException('You do not have permission to update this book');
    }

    return this.prisma.book.update({ where: { id }, data: dto });
  }

  // 5. Delete a book
  async remove(id: number, role: Role) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);

    // Only admins can delete books
    if (role !== Role.ADMIN) {
      throw new ForbiddenException('Only admins can delete books');
    }

    await this.prisma.book.delete({ where: { id } });
    return { message: `Book ${id} deleted successfully` };
  }
}