import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BookService {
    constructor(private prisma: PrismaService) {}

    async createBook(book: IFormData) {
      const { images, ...rest } = book;

      // 1. Create book
      const response = await this.prisma.book.create({
        data: {
          ...rest,
          displaySettings: { ...book.displaySettings },
        },
      });

      // 2. Link images to the created book
      if (images.length > 0) {
        await this.prisma.images.updateMany({
          where: {
            id: {
              in: images.map(image => image.id),
            },
          },
          data: {
            bookId: response.id,
          },
        });
      }

      return response;
    }

    async getMyBooks(userId: number) {
        return this.prisma.book.findMany({
            where: { userId },
            select: {
                id: true,
                bookSize: true,
                coverPhotoUrl: true,
                bookTitle: true,
                displaySettings: true,
                images: {
                  select: {
                    id: true,
                    url: true,
                    filename: true,
                    displayOptions: true,
                  },
                },
            },
        });
    }
}

interface DisplayOptions {
  caption?: string | undefined;
  name?: string | undefined;
  age?: string | undefined;
  date?: string;
  tags?: string;
}

interface ImageData {
  id: string;
  url: string;
  displayOptions?: DisplayOptions;
}

interface DisplaySettings {
  showCaption: boolean;
  showName: boolean;
  showDate: boolean;
}

export interface IFormData {
  images: ImageData[];
  userId: number;
  bookSize: string;
  coverPhotoUrl: string | null;
  bookTitle: string;
  displaySettings: DisplaySettings;
}