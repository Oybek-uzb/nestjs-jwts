import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';
import { Tokens } from './types';
import { GetCurrentUser, Public } from '../common/decorators';
import { RtGuard } from '../common/guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDTO): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('/local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthDTO): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUser('sub') userId: number) {
    return this.authService.logout(userId);
  }

  @UseGuards(RtGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUser('sub') userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
