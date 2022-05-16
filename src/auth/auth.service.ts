import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) {}

    signupLocal(dto: AuthDTO) {
        const newUser = this.prismaService.user.create({
            data: {
                email: dto.email,
                hash: dto.password
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
