import { Controller, Post, Body, Res, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: { email: string; password: string; name?: string }) {
    return this.authService.signup(body.email, body.password, body.name);
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response
  ) {
    try{
      const result = await this.authService.login(body.email, body.password);
      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      // Don't send token in body anymore
      return { user: result.user };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req){
    return { userId: req.user.userId, email: req.user.email };
  }

  @Get('sign-out')
  async signOut(@Res() res: Response) {
    res.clearCookie('token');
    res.redirect(process.env.LOGOUT_URL || 'http://localhost:3000/');
  }

  @Get('users')
  async findAllUsers() {
    return this.authService.findAllUsers();
  }
}