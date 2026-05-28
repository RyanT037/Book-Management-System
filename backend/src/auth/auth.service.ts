import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from 'src/generated/prisma/browser';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // Emails are unique login identifiers, so reject duplicates early.
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (exists) {
      throw new BadRequestException('Email already exists');
    }

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: await bcrypt.hash(dto.password, 10),
        name: dto.name,
        username: dto.username,
        // Public registration always creates standard users; admins are managed separately.
        role: Role.USER,
      },
      
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        role: true,
      },
    });

    return { user };
  }

  async login(dto: LoginDto) {
    // Use one generic error so attackers cannot discover which emails exist.
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      access_token: await this.signToken(user.id, user.email, user.role),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  }

  private signToken(userId: number, email: string, role: Role) {
    // Passport reads sub, email, and role from this payload on protected routes.
    return this.jwt.signAsync({ sub: userId, email, role });
  }
}
