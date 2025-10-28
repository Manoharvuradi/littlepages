import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { BookimageService, UploadBookImageInput } from './bookimage.service';

@Controller('bookimage')
export class BookimageController {
    constructor(private readonly bookimageService: BookimageService) {}

    @Post('create')
    async addImageToBook(@Body() body: UploadBookImageInput) {
        return this.bookimageService.addBookImage(body);
    }

    @Get("get/:id")
    async getBookImage(@Param("id", ParseIntPipe) id: string) {
        return this.bookimageService.getBookImages(id);
    }

    @Patch("updateOrder")
    async updatePageOrder(
        @Body() body: { bookId: number; pages: { id: number; pageOrder: number }[] }
        ) {
        return this.bookimageService.updateBookImageOrder(body.bookId, body.pages);
    }

    @Put("update/:id")
    async updateBookImage(
        @Param("id", ParseIntPipe) id: number,
        @Body() body: Partial<UploadBookImageInput>
    ) {
        return this.bookimageService.updateBookImageDescription(id, body);
    }

    @Delete("delete/:id")
    async deleteBookImage(@Param("id", ParseIntPipe) id: number) {
        return this.bookimageService.deleteBookImage(id);
    }

    @Patch("update/:id")
    async updateBookImageApi(
        @Param("id", ParseIntPipe) id: number,
        @Body() body: Partial<UploadBookImageInput>
    ) {
        return this.bookimageService.updateBookImage(id, body);
    }
}
