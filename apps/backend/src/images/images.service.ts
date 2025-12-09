import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
                displayOptions: true
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
            data: imageInput as Prisma.ImagesUpdateInput,
        });
    }

    async getAllImages(imagesId: string[]) {
        return this.prisma.images.findMany({
            where: {
                id:{
                    in: imagesId
                }
            },
            select: {
                id: true,
                url: true,
            },
        });
    }

    async showImage(id: string) {
        return this.prisma.images.findUnique({ where: { id } });
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
displayOptions: {
    name?: string;
    age?: string;
    caption?: string;
    date?: Date;
    tags?: string; // or string[] if using Json in Prisma
}
};