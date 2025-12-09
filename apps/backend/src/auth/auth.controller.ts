import { Controller, Post, Body, Res, Get, UseGuards, Req, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.decorator';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() body: { email: string; password: string; name?: string }) {
    return this.authService.signup(body.email, body.password, body.name);
  }

  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response
  ) {
    const token = await this.authService.login(body.email, body.password);
    res.cookie('jwt', token.access_token, { httpOnly: true });
    return token;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@GetUser() user: any) {
    return user;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return { message: 'Logged out successfully' };
  }

  @Get('users')
  async findAllUsers() {
    return this.authService.findAllUsers();
  }

  @Put('userbooks')
  @UseGuards(JwtAuthGuard)
  async getUserBooks(@Req() req: any) {
    const userId = req.user.sub;
    return this.authService.showUserBooks(userId);
  }
}