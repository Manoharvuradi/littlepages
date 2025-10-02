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
            select:{
                id:true,
                url:true,
                filename:true,
                name: true,
                caption: true,
                age: true
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async addImage(imageInput: ImageInput) {
        return this.prisma.images.create({
            data: imageInput
        });
    }

    async deleteImage(id: string) {
        return this.prisma.images.delete({ where: { id } });
    }

    async updateImage(id: string, imageInput: Partial<ImageUpdateInput>) {
        return this.prisma.images.update({
            where: { id },
            data: imageInput,
        });
    }
}

export type ImageInput = {
  id?: string;
  userId: number;
  url: string;
  filename: string;
  name?: string;
  age?: string;
  caption?: string;
  date?: Date;
  tags?: string; // or string[] if using Json in Prisma
};

export type ImageUpdateInput = {
  id: string;
  userId: number;
  url: string;
  filename: string;
  name?: string;
  age?: string;
  caption?: string;
  date?: Date;
  tags?: string; // or string[] if using Json in Prisma
};