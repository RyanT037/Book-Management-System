import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '../prisma/prisma.service';

const PAGE_SIZE = 10;

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateBookDto, userId: number) {
    return this.prisma.book.create({
      data: {
        title: dto.title,
        author: dto.author,
        isbn: dto.isbn,
        publishedYear: dto.publishedYear,
        description: dto.description,
        quantity: dto.quantity,
        available: dto.quantity > 0,
        userId,
      },
    });
  }

  findAll(userId: number, page = 1) {
    return this.prisma.book.findMany({
      where: { userId },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: { createdAt: 'desc' },
    });
  }

  findAvailable(page = 1) {
    return this.prisma.book.findMany({
      where: { available: true },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, userId: number) {
    const book = await this.prisma.book.findFirst({
      where: { id, userId },
    });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  async update(id: number, dto: UpdateBookDto, userId: number) {
    const existing = await this.prisma.book.findFirst({
      where: { id, userId },
    });
    if (!existing) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return this.prisma.book.update({
      where: { id },
      data: {
        ...dto,
        ...(dto.quantity !== undefined && {
          available: dto.quantity > 0,
        }),
      },
    });
  }

  async remove(id: number, userId: number) {
    const existing = await this.prisma.book.findFirst({
      where: { id, userId },
    });
    if (!existing) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    await this.prisma.book.delete({ where: { id } });
    return { message: `Book ${id} deleted successfully` };
  }
}
