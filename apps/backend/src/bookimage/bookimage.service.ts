import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BookimageService {
    constructor(private prisma: PrismaService) {}

    async addBookImage(body: UploadBookImageInput) {

        const { bookId, fileUrl, caption, name, age, date, tags, userId, filename } = body;

  // 1️⃣ Create the Image first
        const newImage = await this.prisma.images.create({
            data: {
                url: fileUrl,
                filename: filename,
                userId: userId,
            },
        });

        // 2️⃣ Create BookImage that points to this Image
        const newBookImage = await this.prisma.bookImage.create({
            data: {
                bookId,
                imageId: newImage.id,
                caption: caption || null,
                name: name || null,
                age: age || null,
                date: date ? new Date(date) : null,
                tags: tags || null,
            },
        });

        return newBookImage;
        // Logic to add book image
    }

    async getBookImages(id: string) {
        return this.prisma.bookImage.findMany({
            where: {
                imageId: id,
            },
            
            
        });
    }

    async updateBookImageOrder(bookId: number, pages: { id: number; pageOrder: number }[]) {
        const updates = pages?.map((p) =>
            this.prisma.bookImage.update({
                where: { id: p.id },
                data: { 
                    pageOrder: p.pageOrder 
                },
            })
        );

        await this.prisma.$transaction(updates); // 👈 executes all updates together
        return { success: true };
    }
}

export class UploadBookImageInput  {
    bookId: number;
    fileUrl: string;
    caption?: string;
    name?: string;
    age?: string;
    date?: string; // ISO string
    tags?: string; // or string[] if using Json in Prisma
    userId: number; // ID of the user uploading the image
    filename: string; // Original filename of the uploaded image
}