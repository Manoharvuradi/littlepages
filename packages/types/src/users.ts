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