import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AppService } from './app.service';
import { UpdateGreetingDto } from './old/greeting/dto/greeting.dto';
import { AddMovieDto } from './old/movies/dto/movies.dto';
import { Movies } from './types/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getGreeting(): string {
    return this.appService.getGreeting();
  }

  @Put('greeting')
  updateGreeting(@Body() body: UpdateGreetingDto): string {
    return this.appService.upDateGreeting(body.greeting);
  }

  @Get('time')
  getCurrentTime(): string {
    return this.appService.getCurrentTime();
  }

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
