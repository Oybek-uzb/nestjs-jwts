import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/local/signup")
    signupLocal(@Body() dto: AuthDTO) {
        this.authService.signupLocal(dto)
    }

    @Post("/local/signin")
    signinLocal() {
        this.authService.signinLocal()
    }

    @Post("/logout")
    logout() {
        this.authService.logout()
    }

    @Post("/refresh")
    refreshTokens() {
        this.authService.refreshTokens()
    }
}
