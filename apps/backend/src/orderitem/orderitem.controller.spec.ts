import { Test, TestingModule } from '@nestjs/testing';
import { OrderitemController } from './orderitem.controller';

describe('OrderitemController', () => {
  let controller: OrderitemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderitemController],
    }).compile();

    controller = module.get<OrderitemController>(OrderitemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
