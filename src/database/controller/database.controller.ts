import { Controller, Get, Inject } from '@nestjs/common';
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
}
