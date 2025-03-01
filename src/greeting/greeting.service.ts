import { Injectable, Logger } from '@nestjs/common';
import { readDB, writeToDB } from 'src/utils/utils';

@Injectable()
export class GreetingService {
  private readonly logger = new Logger(GreetingService.name);

  getGreeting(): any {
    const data = readDB();
    return data.greeting;
  }

  updateGreeting(greeting: string): any {
    const data = readDB();
    const oldGreeting = data.greeting;
    const newGreeting = greeting;

    data.greeting = newGreeting;
    writeToDB(data);
    this.logger.log(`Greeting updated from ${oldGreeting} to ${newGreeting}`);
    return 'Greeting updated.';
  }

  getCurrentTime(): string {
    const currentTime = new Date().toLocaleTimeString();
    return `The current time is: ${currentTime}`;
  }
}
