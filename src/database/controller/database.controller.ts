import { Body, Controller, Delete, Get, Inject, Post } from '@nestjs/common';
import { Users } from 'src/types/types';

@Controller()
export class DatabaseController {
  constructor(
    @Inject('DatabaseService') private readonly databaseService: any,
  ) {}
  @Get()
  getApp() {
    return 'hello world';
  }

  @Get('customers')
  async getCustomers(): Promise<Users> {
    return await this.databaseService.getCustomers();
  }
  @Post()
  async addUser(@Body() data): Promise<Users> {
    return await this.databaseService.addUser(data);
  }
  @Delete()
  async deleteUser(@Body() data): Promise<Users> {
    return await this.databaseService.deleteUserById(data);
  }
}
