import { Body, Controller, Delete, Get, Inject, Post } from '@nestjs/common';
import { Movies } from 'src/types/types';

@Controller('movies')
export class DatabaseController {
  constructor(
    @Inject('DatabaseService') private readonly databaseService: any,
  ) {}

  @Get()
  async getMovies(): Promise<Movies> {
    return await this.databaseService.getMovies();
  }
  @Post()
  async addMovie(@Body() data): Promise<Movies> {
    return await this.databaseService.addMovie(data);
  }
  @Delete()
  async deleteMovie(@Body() data) {
    return await this.databaseService.deleteMovie(data);
  }
}
