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

import { AppService } from './greeting.service';
import { AddMovieDto, UpdateGreetingDto } from './dto/greeting.dto';
import { Movies } from '../Types/types';

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
}
