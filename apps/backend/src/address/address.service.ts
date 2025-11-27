import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class AddressService {
    constructor() {}

    async createAddress(addressData: Prisma.AddressCreateInput) {
        return {
            message: 'Address created successfully',
            data: addressData,
        };
    }
}
