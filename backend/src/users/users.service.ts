import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

// Service responsible for administrative user management and profile updates.
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    // Hash the password before storage to ensure security.
    // Salt rounds are set to 10 for a good balance between security and performance.
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        username: createUserDto.username,
        password: hashedPassword,
        role: createUserDto.role,
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
      },
    });
  }

  findAll() {
    // Retrieve all users, excluding sensitive fields like passwords from the result.
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        role: true,
      },
    });
  }

  findOne(id: number) {
    // Fetch a single user by their unique numeric ID.
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        role: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const dto = updateUserDto as Partial<CreateUserDto>;

    // Build the update object from optional DTO fields and remove values that
    // were not submitted, keeping partial updates safe and predictable.
    const data: Partial<CreateUserDto> = {
      email: dto.email,
      name: dto.name,
      username: dto.username,
      role: dto.role,
    };

    if (dto.password) {
      // Re-hash password changes before saving them.
      data.password = await bcrypt.hash(dto.password, 10);
    }

    // Clean the data object to ensure we only update fields that were actually provided.
    Object.keys(data).forEach((key) => {
      const typedKey = key as keyof typeof data;
      if (data[typedKey] === undefined) {
        delete data[typedKey];
      }
    });

    // Persist the changes to the database.
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        role: true,
      },
    });
  }

  remove(id: number) {
    // Permanently delete a user record from the database.
    return this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
      },
    });
  }
}
