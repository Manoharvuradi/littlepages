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