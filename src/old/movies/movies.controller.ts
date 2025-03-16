import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { MovieService } from 'src/old/movies/movies.service';
import { AddMovieDto } from './dto/movies.dto';
import { Movies } from '../../types/types';

@Controller()
export class MovieController {
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
