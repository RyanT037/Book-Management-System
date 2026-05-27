import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

// Reuses create-user validation rules while making every field optional.
export class UpdateUserDto extends PartialType(CreateUserDto) {}
