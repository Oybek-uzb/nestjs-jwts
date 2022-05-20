import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto/auth.dto';
import * as bcrypt from "bcrypt";
import { Tokens } from './types';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) {}

    hashData(data: string) {
        return bcrypt.hash(data, 10)
    }

    async signupLocal(dto: AuthDTO): Promise<Tokens> {
        const hash = await this.hashData(dto.password)
        
        const newUser = this.prismaService.user.create({
            data: {
                email: dto.email,
                hash
            }
        })

    }

    signinLocal() {
        
    }

    logout() {
        
    }

    refreshTokens() {
        
    }
}
