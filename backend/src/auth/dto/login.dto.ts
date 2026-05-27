import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Defines the credentials required for user login.
// Validation decorators protect the endpoint from incomplete or invalid input.
export class LoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'testuser@test.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({ description: 'User password', example: 'password123' })
  @IsNotEmpty()
  password!: string;
}
