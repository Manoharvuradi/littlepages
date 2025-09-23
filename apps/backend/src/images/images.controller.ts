import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ImagesService } from './images.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('images')
@UseGuards(JwtAuthGuard)
export class ImagesController {
    constructor(private readonly imageService: ImagesService) {}

    @Get('my')
    async getMyImages(@Req() req) {
        return this.imageService.getImagesByUser(req.user.userId);
    }

    @Post('add')
    async addImage(@Req() req, @Body() body: { url: string, filename: string }) {
        return this.imageService.addImage(req.user.userId, body.url, body.filename);
    }

    @Delete('delete')
    async deleteImage(@Req() req, @Body() body: { id: string }) {
        return this.imageService.deleteImage(body.id);
    }

    // @Post('update')
    // async updateImage(@Req() req, @Body() body: { id: string, url: string, filename: string }) {
    //     return this.imageService.updateImage(body.id, body.url, body.filename);
    // }
}
