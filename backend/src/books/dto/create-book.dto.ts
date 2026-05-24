import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  author!: string;

  @IsString()
  @IsNotEmpty()
  isbn!: string;

  @IsInt()
  publishedYear!: number;

  @IsString()
  description!: string;

  @IsInt()
  @Min(0)
  quantity!: number;
}
