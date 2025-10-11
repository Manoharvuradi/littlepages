import { Test, TestingModule } from '@nestjs/testing';
import { BookimageService } from './bookimage.service';

describe('BookimageService', () => {
  let service: BookimageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookimageService],
    }).compile();

    service = module.get<BookimageService>(BookimageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
