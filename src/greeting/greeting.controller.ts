import {
  Body,
  Controller,
  Get,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { GreetingService } from './greeting.service';
import { UpdateGreetingDto } from './dto/greeting.dto';

@Controller()
export class GreetingController {
  constructor(private readonly appService: GreetingService) {}

  @Get()
  getGreeting(): string {
    return this.appService.getGreeting();
  }

  @Put('greeting')
  @UsePipes(new ValidationPipe())
  updateGreeting(@Body() body: UpdateGreetingDto): string {
    return this.appService.updateGreeting(body.greeting);
  }

  @Get('time')
  getCurrentTime(): string {
    return this.appService.getCurrentTime();
  }
}
