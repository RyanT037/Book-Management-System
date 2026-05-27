import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

// Controller for handling authentication-related requests such as registration and login
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint for public user registration
  @Post('register')
  @ApiOperation({
    summary: 'Register a new user account',
    description:
      'Creates a public user account. The role is assigned by the server and defaults to USER.',
  })
  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse({
    description: 'User registered successfully.',
    schema: {
      example: {
        user: {
          id: 1,
          email: 'reader@example.com',
          name: 'Jane Reader',
          username: 'janereader',
          role: 'USER',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Email already exists or request data is invalid.',
  })
  register(@Body() dto: RegisterDto) {
    // Delegates registration logic to the AuthService
    return this.authService.register(dto);
  }

  // Endpoint for user login to obtain a JWT token
  @Post('login')
  @ApiOperation({
    summary: 'Log in and receive a JWT access token',
    description:
      'Authenticates a user with email and password, then returns a JWT access token for protected endpoints.',
  })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'Login successful.',
    schema: {
      example: {
        access_token: 'jwt-token-here',
        user: {
          id: 1,
          email: 'reader@example.com',
          name: 'Jane Reader',
          username: 'janereader',
          role: 'USER',
          createdAt: '2026-05-27T08:00:00.000Z',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Invalid email or password.' })
  login(@Body() dto: LoginDto) {
    // Delegates authentication logic to the AuthService
    return this.authService.login(dto);
  }
}
