import { Body, Controller, Delete, Get, Inject, Post } from '@nestjs/common';
import { Users } from 'src/types/types';

@Controller('users')
export class DatabaseController {
  constructor(
    @Inject('DatabaseService') private readonly databaseService: any,
  ) {}

  @Get()
  async getUsers(): Promise<Users> {
    return await this.databaseService.getUsers();
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
