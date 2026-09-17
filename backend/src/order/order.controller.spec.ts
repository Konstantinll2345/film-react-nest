jest.mock('./order.service', () => ({
  OrderService: jest.fn().mockImplementation(() => ({
    createOrder: jest.fn(),
  })),
}));

import { Test } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;
  const mockOrderService = {
    createOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useValue: mockOrderService }],
    }).compile();

    controller = module.get(OrderController);
    jest.clearAllMocks();
  });

  it('createOrder возвращает { total, items }', async () => {
    mockOrderService.createOrder.mockResolvedValue([{ id: '1' }]);
    const dto = { email: 'a@b.c', phone: '+7', tickets: [] };
    const result = await controller.createOrder(dto as any);
    expect(result).toEqual({ total: 1, items: [{ id: '1' }] });
  });
});