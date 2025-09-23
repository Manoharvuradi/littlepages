import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ImagesService {
    constructor(private prisma: PrismaService) {}

    async getImagesByUser(userId: number) {
        return this.prisma.images.findMany({ 
            where: { 
                userId 
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async addImage(userId: number, url: string, filename: string) {
        return this.prisma.images.create({
            data: { 
                userId, 
                url, 
                filename
            },
        });
    }

    async deleteImage(id: string) {
        return this.prisma.images.delete({ where: { id } });
    }

    // async updateImage(id: string, url: string, filename: string) {
    //     return this.prisma.images.update({
    //         where: { id },
    //         data: { url, filename },
    //     });
    // }
}
