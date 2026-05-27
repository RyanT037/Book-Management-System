import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from 'src/generated/prisma/browser';

// Service responsible for handling business logic related to book operations.
@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateBookDto, userId: number) {
    // Persist a new book record in the database.
    // Link each book to its creator so ownership rules can be enforced later.
    return this.prisma.book.create({
      data: {
        title: dto.title,
        author: dto.author,
        isbn: dto.isbn,
        publishedYear: dto.publishedYear,
        description: dto.description,
        userId,
      },
    });
  }

  findAll() {
    // Retrieve all books from the database.
    // Newest-first ordering keeps the dashboard table useful as the collection grows.
    return this.prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // Retrieve a specific book by its unique ID.
  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({ where: { id } });

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  // Update an existing book record after verifying permissions.
  async update(id: number, dto: UpdateBookDto, userId: number, role: Role) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);

    // Only the owner or an admin can change a book record.
    if (book.userId !== userId && role !== Role.ADMIN) {
      throw new ForbiddenException(
        'You do not have permission to update this book',
      );
    }

    return this.prisma.book.update({ where: { id }, data: dto });
  }

  // Remove a book record from the database.
  async remove(id: number, role: Role) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);

    // Deletion is reserved for admins to avoid accidental data loss by users.
    if (role !== Role.ADMIN) {
      throw new ForbiddenException('Only admins can delete books');
    }

    await this.prisma.book.delete({ where: { id } });
    return { message: `Book ${id} deleted successfully` };
  }
}
