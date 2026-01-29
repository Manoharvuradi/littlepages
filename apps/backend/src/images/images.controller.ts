import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ImageInput, ImagesService, ImageUpdateInput } from './images.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('images')
@UseGuards(JwtAuthGuard)
export class ImagesController {
    constructor(private readonly imageService: ImagesService) {}

    @Get('my')
    @UseGuards(JwtAuthGuard)
    getMyImages(@Req() req) {
        return this.imageService.getImagesByUser(req.user.sub);
    }

    @Post('add')
    async addImage(@Req() req, @Body() body: Partial<ImageInput>) {
        return this.imageService.addImage(this.createImageInput(req.user.sub, body));
    }

    @Delete('delete/:id')
    async deleteImage( @Param('id') id: string) {
        return this.imageService.deleteImage(id);
    }

    @Put('update/:id')
    async updateImage(@Req() req, @Body() body: Partial<ImageInput>) {
        const imageInput = this.updateImageInput(body);
        return this.imageService.updateImage(req.params.id, imageInput);
    }

    private createImageInput(userId: number, body: Partial<ImageInput>): ImageInput {
        return {
            userId,
            url: body.url!,
            filename: body.filename!,
            name: body.name,
            age: body.age,
            caption: body.caption,
            date: body.date,
            tags: body.tags,
        };
    }

    private updateImageInput(body: Partial<ImageUpdateInput>): Partial<ImageUpdateInput> {
        return {
            id: body.id,
            userId: body.userId,
            url: body.url,
            filename: body.filename,
            displayOptions: {
                name: body?.displayOptions?.name,
                age: body.displayOptions?.age,
                caption: body.displayOptions?.caption,
                date: body.displayOptions?.date,
                tags: body.displayOptions?.tags,
            }
        };
    }

    @Post("getAll")
    async getAllBookImages(@Body() body: { imagesId: string[] }) {
        return this.imageService.getAllImages(body.imagesId);
    }

    @Get(":id")
    async coverPhotoImage(@Param("id") id: string) {
        return this.imageService.showImage(id);
    }

    @Put("replaceCover/:id")
  async replaceCoverImage(
    @Param("id") id: string,
    @Body("coverPhotoUrl") coverPhotoUrl: string | null
  ) {
    return this.imageService.replaceCoverImage(id, coverPhotoUrl);
  }
}
