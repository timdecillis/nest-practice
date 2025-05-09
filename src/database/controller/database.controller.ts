import { Controller, Get, Inject, Query } from '@nestjs/common';
import { Order, User } from 'src/types/types';
import { PrismaDatabaseService } from '../prisma-service/service/database.prisma.service';

@Controller()
export class DatabaseController {
  constructor(
    @Inject('DatabaseService')
    private readonly databaseService: PrismaDatabaseService,
  ) {}
  @Get()
  getApp() {
    return 'hello world';
  }

  @Get('customers')
  async getCustomers(): Promise<User[]> {
    return await this.databaseService.getCustomers();
  }
  @Get('orders')
  async getOrders(@Query('customer_id') customer_id: string): Promise<Order[]> {
    return await this.databaseService.getOrders(parseInt(customer_id));
  }
}
