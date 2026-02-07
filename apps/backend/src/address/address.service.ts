import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { compareSync } from 'bcrypt';
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

    async getAddresses(userId: number) {
        try{
            const address = await this.prisma.address.findFirst({
                where: {
                  userId: Number(userId),
                },
                orderBy: {
                  createdAt: 'desc',
                },
              });
            return address;
        } catch (error) {
            console.error("Error fetching addresses:", error);
            throw error;
        }
    }

    async updateExistingAddress(id: string, addressData: any) {
        const { user, ...rest } = addressData;
        const req: any = {
            ...rest,
            name: rest.name,
            street: rest.street,
            city: rest.city,
            state: rest.state,
            zip: rest.zip,
            phone: rest.phone,
        };
        return await this.prisma.address.update({
            where: { id: id },
            data: {
                ...req,
            },
        });
    }
}
