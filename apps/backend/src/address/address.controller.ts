import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AddressService } from './address.service';
import { Prisma } from '@prisma/client';


@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Post('create')
    async createAddress(@Body() addressData: Prisma.AddressCreateInput | any) {
        return this.addressService.createAddress(addressData);
    }

    @Get("get/:userId")
    async getAddresses(@Param("userId") userId: number) {
        return this.addressService.getAddresses(userId);
    }

    @Put('update/:id')
    async updateAddress(
      @Param('id') id: string,
      @Body() address: any
    ) {
      return this.addressService.updateExistingAddress(id, address);
    }
}
