import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '../prisma/prisma.service';

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

  // 2. Simplified: Retrieve all books belonging to the user without pagination complexity
  findAll(userId: number) {
    return this.prisma.book.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }, // Keeps newest books at the top
    });
  }

  // 3. Retrieve a single book safely
  async findOne(id: number, userId: number) {
    const book = await this.prisma.book.findFirst({
      where: { id, userId },
    });
    
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  // 4. Update a book directly using fields passed in the DTO
  async update(id: number, dto: UpdateBookDto, userId: number) {
    // Reuses the findOne method logic to verify ownership/existence first
    await this.findOne(id, userId);

    return this.prisma.book.update({
      where: { id },
      data: dto,
    });
  }

  // 5. Delete a book
  async remove(id: number, userId: number) {
    // Reuses the findOne method logic to verify ownership/existence first
    await this.findOne(id, userId);

    await this.prisma.book.delete({ where: { id } });
    return { message: `Book ${id} deleted successfully` };
  }
}