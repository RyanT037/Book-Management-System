import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/generated/prisma/browser';
import type { Request } from 'express';

type AuthRequest = Request & {
  user: { id: number; email: string; role?: Role };
};

@ApiTags('Users')
@ApiBearerAuth('bearer')
@ApiUnauthorizedResponse({ description: 'JWT token is missing or invalid.' })
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a user account as an admin',
    description: 'Creates a user account. This endpoint is restricted to admins.',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'User created successfully.',
    schema: {
      example: {
        id: 2,
        email: 'staff@example.com',
        username: 'staffuser',
        role: 'USER',
      },
    },
  })
  @ApiForbiddenResponse({ description: 'Only admins can create users.' })
  create(@Body() createUserDto: CreateUserDto, @Req() req: AuthRequest) {
    if (req.user.role !== Role.ADMIN) {
      throw new ForbiddenException('Only admins can create users');
    }
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users as an admin',
    description: 'Returns all user accounts. This endpoint is restricted to admins.',
  })
  @ApiOkResponse({
    description: 'List of users.',
    schema: {
      example: [
        {
          id: 1,
          email: 'admin@example.com',
          name: 'Admin User',
          username: 'adminuser',
          role: 'ADMIN',
        },
      ],
    },
  })
  @ApiForbiddenResponse({ description: 'Only admins can view all users.' })
  findAll(@Req() req: AuthRequest) {
    if (req.user.role !== Role.ADMIN) {
      throw new ForbiddenException('Only admins can view all users');
    }
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get one user by id',
    description: 'Returns a single user account by numeric id.',
  })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({
    description: 'User found.',
    schema: {
      example: {
        id: 1,
        email: 'admin@example.com',
        name: 'Admin User',
        username: 'adminuser',
        role: 'ADMIN',
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a user by id',
    description: 'Partially updates a user account by numeric id.',
  })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({
    description: 'User updated successfully.',
    schema: {
      example: {
        id: 1,
        email: 'updated@example.com',
        name: 'Updated User',
        username: 'updateduser',
        role: 'USER',
      },
    },
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a user by id as an admin',
    description: 'Deletes a user account. This endpoint is restricted to admins.',
  })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({
    description: 'User deleted successfully.',
    schema: { example: { id: 1 } },
  })
  @ApiForbiddenResponse({ description: 'Only admins can delete users.' })
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    if (req.user.role !== Role.ADMIN) {
      throw new ForbiddenException('Only admins can delete users');
    }
    return this.usersService.remove(+id);
  }
}
