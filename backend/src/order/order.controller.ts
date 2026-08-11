import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderRequestDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  async createOrder(@Body() orderDto: OrderRequestDto) {
    const items = await this.orderService.createOrder(orderDto);
    return {
      total: items.length,
      items,
    };
  }
}