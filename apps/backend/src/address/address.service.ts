import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class AddressService {
    constructor(private prisma: PrismaService) {}

    async createAddress(addressData: any) {
        const { user, ...rest } = addressData;
        const req: any = {
            ...rest,
            user: {
                    connect:{
                        id: user.sub as any,
                    }
                },
        };
       return await this.prisma.address.create({
            data: {
                ...req,
            },
        });
    }
}
