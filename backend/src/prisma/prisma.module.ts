import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// The @Global decorator makes the PrismaService available throughout the entire application
// without needing to import PrismaModule into every other feature module.
@Global()
@Module({
  providers: [PrismaService], // Registers PrismaService as a provider within this module.
  exports: [PrismaService], // Exports PrismaService so other modules can inject it.
})
export class PrismaModule {}
