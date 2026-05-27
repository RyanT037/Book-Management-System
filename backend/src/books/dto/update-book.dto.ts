import { PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';

// Data Transfer Object for updating an existing book.
// Uses PartialType to make all properties from CreateBookDto optional for PATCH requests.
export class UpdateBookDto extends PartialType(CreateBookDto) {}
