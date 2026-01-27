import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BookService {
    constructor(private prisma: PrismaService) {}

async createBook(book: IFormData) {
  const { images, ...rest } = book;

  // Step 1️⃣ — Create the book
  const createdBook = await this.prisma.book.create({
    data: {
      userId: rest.userId,
      bookSize: rest.bookSize,
      coverPhotoUrl: rest.coverPhotoUrl,
      bookTitle: rest.bookTitle,
      displaySettings: { ...rest.displaySettings },
      

      // Step 2️⃣ — Create BookImage entries for each image
      bookImages: {
        create: images.map((img, index) => ({
          imageId: img.id,
          caption: img.displayOptions?.caption || null,
          name: img.displayOptions?.name || null,
          age: img.displayOptions?.age || null,
          date: img.displayOptions?.date ? new Date(img.displayOptions?.date) : null,
          tags: img.displayOptions?.tags || null,
          pageOrder: index + 1,
        })),
      },
    },
    include: {
      bookImages: true, // optional, to return created bookImages as well
    },
  });

  // Step 3️⃣ — (Optional) Update images table if needed
  // If you still want each image to store which book it belongs to:
  if (images.length > 0) {
    await this.prisma.images.updateMany({
      where: {
        id: { in: images.map((i) => i.id) },
      },
      data: {
        bookId: createdBook.id,
      },
    });
  }

  return createdBook;
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

    async getBook(id: number, userId: number) {
        return await this.prisma.book.findFirst({
            where: {
                id: id,
                userId: userId    
            },
            include: {
                bookImages: {
                  orderBy: {
                    pageOrder: 'asc'
                  },
                  include: {
                    image: true
                  } 
                },
            }, 
        });
    }

    async updateBookTitle(id: number, bookTitle: string) {
      return this.prisma.book.update({
        where: { id },
        data: { bookTitle },
      });
    }

    async updateBookSize(id: number, bookSize: string) {
      return this.prisma.book.update({
        where: { id },
        data: { bookSize },
      });
    }

    async updateDisplaySettings(id: number, displaySettings: any) {
      return this.prisma.book.update({
        where: { id },
        data: { displaySettings },
      });
    }

// Service
  async deleteBook(id: number) {
    try {
      // First, delete all related records
      await this.prisma.$transaction([
        // Delete related records first (adjust based on your schema)
        this.prisma.bookImage.deleteMany({
          where: { bookId: id },
        }),
        // Add other related deletions here
        // this.prisma.otherRelatedTable.deleteMany({ where: { bookId: id } }),
        
        // Finally delete the book
        this.prisma.book.delete({
          where: { id },
        }),
      ]);

      return { success: true, message: 'Book deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete book: ${error.message}`);
    }
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

export class IFormData {
  images: ImageData[];
  userId: number;
  bookSize: string;
  coverPhotoUrl: string | null;
  bookTitle: string;
  displaySettings: DisplaySettings;
}