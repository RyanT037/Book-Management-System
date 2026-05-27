import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Defines the fields accepted during public user registration.
// Role is intentionally excluded because the server assigns the default USER role.
export class RegisterDto {
  @ApiProperty({
    description: 'User email address',
    example: 'reader@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description: 'User password. Must be at least 6 characters.',
    example: 'password123',
    minLength: 6,
  })
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'Jane Reader',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'Unique username for the user',
    example: 'janereader',
  })
  @IsString()
  @IsNotEmpty()
  username!: string;

  // Role cannot be set during public registration.
}
