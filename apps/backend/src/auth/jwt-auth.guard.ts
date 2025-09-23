import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.cookies['token'];
    if (!token) return false;
    try {
      const payload = this.jwtService.verify(token);
      req.user = { userId: payload.sub, email: payload.email };
      return true;
    } catch {
      return false;
    }
  }
}