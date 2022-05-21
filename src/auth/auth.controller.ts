import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/local/signup")
    @HttpCode(HttpStatus.CREATED)
    signupLocal(@Body() dto: AuthDTO): Promise<Tokens> {
        return this.authService.signupLocal(dto)
    }

    @Post("/local/signin")
    @HttpCode(HttpStatus.OK)
    signinLocal(@Body() dto: AuthDTO): Promise<Tokens> {
        return this.authService.signinLocal(dto)
    }

    @UseGuards(AuthGuard("jwt"))
    @Post("/logout")
    @HttpCode(HttpStatus.OK)
    logout(@Req() req: Request) {
        const user = req.user
        return this.authService.logout(user["id"])
    }

    @UseGuards(AuthGuard("jwt-refresh"))
    @Post("/refresh")
    @HttpCode(HttpStatus.OK)
    refreshTokens() {
        // this.authService.refreshTokens()
    }
}
