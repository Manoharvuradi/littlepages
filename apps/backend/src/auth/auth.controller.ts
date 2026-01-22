import { Controller, Post, Body, Res, Get, UseGuards, Req, HttpCode, HttpStatus, Put, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.decorator';
import { CurrentUser } from './get-user.decorator';

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
  @Res({ passthrough: true }) res: Response,
) {
  const { access_token, user } = await this.authService.login(
    body.email,
    body.password,
  );
  
  const isProd = process.env.NODE_ENV === 'production';
  const isDev = process.env.NODE_ENV === 'development';
  
  // Cookie configuration based on environment
  const cookieOptions = {
    httpOnly: true,
    secure: isProd, // only use secure in production (requires HTTPS)
    sameSite: isProd ? ('none' as const) : ('lax' as const),
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // Add domain only in production if needed
    ...(isProd && process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN }),
  };
  
  res.cookie('jwt', access_token, cookieOptions);
  
  console.log("Cookie set with options:", cookieOptions);
  console.log("Response headers:", res.getHeaders());
  
  return {
    user,
    access_token,
  };
}

  @Get('me')
@UseGuards(JwtAuthGuard)
getMe(@CurrentUser() user: any) {
  if (!user) {
    throw new UnauthorizedException('User not authenticated');
  }
  return user;
}

@Post('logout')
@HttpCode(HttpStatus.OK)
async logout(@Res({ passthrough: true }) res: Response) {
  const isProd = process.env.NODE_ENV === 'production';
  
  // Cookie options MUST match the ones used in login
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/',
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