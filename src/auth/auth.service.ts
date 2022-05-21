import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto/auth.dto';
import * as bcrypt from "bcrypt";
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService
        ) {}


    async signupLocal(dto: AuthDTO): Promise<Tokens> {
        const hash = await this.hashData(dto.password)
        
        const newUser = await this.prismaService.user.create({
            data: {
                email: dto.email,
                hash
            }
        })

        const tokens = await this.getTokens(newUser.id, newUser.email)
        await this.updateRtHash(newUser.id, tokens.refresh_token)

        return tokens
    }

    
    async signinLocal(dto: AuthDTO): Promise<Tokens> {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if(!user) throw new ForbiddenException("Access denied")

        const passwordMatches = await bcrypt.compare(dto.password, user.hash)
        if(!passwordMatches) throw new ForbiddenException("Access denied")

        const tokens = await this.getTokens(user.id, user.email)
        await this.updateRtHash(user.id, tokens.refresh_token)

        return tokens
    }

    async logout(userId: number) {
        await this.prismaService.user.updateMany({
            where: {
                id: userId,
                hashedRt: {
                    not: null
                }
            },
            data: {
                hashedRt: null
            }
        })
    }

    refreshTokens() {
        
    }

    async updateRtHash(userId: number, rt: string) {
        const hash = await this.hashData(rt)
        
        await this.prismaService.user.update({
            where: {
                id: userId
            },
            data: {
                hashedRt: hash
            }
        })
    }

    
    hashData(data: string) {
        return bcrypt.hash(data, 10)
    }

    async getTokens(userId: number, email: string): Promise<Tokens> {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email,
            }, {
                secret: "at-secret",
                expiresIn: 15*60,
            }),
            this.jwtService.signAsync({
                sub: userId,
                email,
            }, {
                secret: "rt-secret",
                expiresIn: 7*60*60*24,
            })
        ])

        return {
            access_token: at,
            refresh_token: rt
        }
    }
    
}
