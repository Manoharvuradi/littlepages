import { Controller, Post, Body, Req, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import type { IFormData } from './book.service';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('create')
  async createBook(@Body() book: IFormData) {
    return this.bookService.createBook(book);
  }

  @Get("mybooks")
  async getMyBooks(@Req() req) {
    return this.bookService.getMyBooks(req.user.sub);
  }

  @Put("userbook/:id")
  async getBook(@Param("id", ParseIntPipe) id: number, @Req() req) {
    return this.bookService.getBook(id, req.user.sub);
  }

  @Put("updateTitle/:id")
  async updateBookTitle(
    @Param("id", ParseIntPipe) id: number,
    @Body("bookTitle") bookTitle: string
  ) {
    return this.bookService.updateBookTitle(id, bookTitle);
  }
}