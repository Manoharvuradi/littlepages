export interface users {
    id?: string;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface images {
    id?: string;
    url: string;
    filename: string;
    createdAt?: Date;    
    updatedAt?: Date;
    userId: string;
}

export interface ImageUpdateInput {
  id: string;
  userId?: number;
  url?: string;
  filename?: string;
  displayOptions?: {
    name?: string;
    age?: string;
    caption?: string;
    date?: Date;
    tags?: string; // or string[] if using Json in Prisma
  }
};

export interface UploadBookImageInput  {
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

export interface BookTitle {
  id: number;
  bookTitle: string;
}