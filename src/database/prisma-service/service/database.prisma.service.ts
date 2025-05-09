import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Order, User } from 'src/types/types';

@Injectable()
export class PrismaDatabaseService {
  constructor(private readonly prisma: PrismaService) {}

  async getCustomers(): Promise<User[]> {
    return await this.prisma.customers.findMany({
      take: 100,
    });
  }
  async getOrders(customer_id: number): Promise<Order[]> {
    return await this.prisma.orders.findMany({
      where: { customer_id: customer_id },
    });
  }
}
