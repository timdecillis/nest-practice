import { Controller, Get, Inject } from '@nestjs/common';
import { Users } from 'src/types/types';
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
  async getCustomers(): Promise<Users> {
    return await this.databaseService.getCustomers();
  }
}
