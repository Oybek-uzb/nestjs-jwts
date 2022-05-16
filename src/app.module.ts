import { Global, Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PrismaModule],
  providers: [PrismaService],
  exports: [PrismaService]
})
export class AppModule {}
