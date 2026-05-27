import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Data Transfer Object for creating a new book.
// Includes validation rules and Swagger documentation for the book's properties.
export class CreateBookDto {
  @ApiProperty({ description: 'Book title', example: 'Clean Code' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ description: 'Book author', example: 'Robert C. Martin' })
  @IsString()
  @IsNotEmpty()
  author!: string;

  @ApiProperty({ description: 'Book ISBN number', example: '9780132350884' })
  @IsString()
  @IsNotEmpty()
  isbn!: string;

  @ApiProperty({ description: 'Year the book was published', example: 2008 })
  @IsInt()
  publishedYear!: number;

  @ApiProperty({
    description: 'Short description of the book',
    example: 'A practical guide to writing readable and maintainable code.',
  })
  @IsString()
  description!: string;
}
