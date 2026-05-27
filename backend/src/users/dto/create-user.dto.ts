import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Local mirror of the Prisma `Role` enum to avoid importing generated client types
export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

// Defines the fields required when an admin creates a user account.
// Admin-created users can include an explicit role assignment.
export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'admin@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ description: 'Full name of the user', example: 'Admin User' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'Unique username for the user',
    example: 'adminuser',
  })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({
    description: 'User password. Must be at least 6 characters.',
    example: 'password123',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @ApiPropertyOptional({
    description: 'User role. Defaults to USER when not provided.',
    enum: Role,
    example: Role.USER,
  })
  // Role is optional so callers can rely on the backend's default user role.
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
