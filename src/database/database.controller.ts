import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller()
export class DatabaseController {
  constructor(private readonly appService: DatabaseService) {}

  @Get('movies')
  getMovies() {
    return this.appService.getMovies();
  }
}
