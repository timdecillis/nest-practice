import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { MovieService } from 'src/services/movies.service';
import { AddMovieDto, UpdateGreetingDto } from '../DTOs/DTOs';
import { Movies } from '../Types/types';

@Controller()
export class AppController {
  constructor(private readonly appService: MovieService) {}

  @Get('movies')
  getMovies(): Movies | string {
    return this.appService.getMovies();
  }

  @Post('movie')
  @UsePipes(new ValidationPipe())
  updateMovies(@Body() body: AddMovieDto): any {
    this.appService.addMovie(body.movie);
    return 'Movie added.';
  }
  addMovie(@Body() body: AddMovieDto): string {
    return this.appService.addMovie(body.movie);
  }

  @Delete('movie')
  deleteMovie(@Body() body: AddMovieDto): string {
    return this.appService.deleteMovie(body.movie);
  }
}
