import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findOne(email: string) {
        return this.prisma.users.findUnique({ 
            where: { 
                email: email 
            },
            select:{
                id: true,
                email: true,
                name: true,
                role: true,
                password: true
            }
        });
    }
}
