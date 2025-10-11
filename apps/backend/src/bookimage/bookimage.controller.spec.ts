import { Test, TestingModule } from '@nestjs/testing';
import { BookimageController } from './bookimage.controller';

describe('BookimageController', () => {
  let controller: BookimageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookimageController],
    }).compile();

    controller = module.get<BookimageController>(BookimageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
