import { Body, Controller, Post } from '@nestjs/common';
import { AddressService } from './address.service';
import { Prisma } from '@prisma/client';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Post('create')
    async createAddress(@Body() addressData: Prisma.AddressCreateInput | any) {
        return this.addressService.createAddress(addressData);
    }
}
