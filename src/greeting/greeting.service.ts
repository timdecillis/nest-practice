import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class GreetingService {
  private dataFilePath = path.join(__dirname, '../db.json');
  private readonly logger = new Logger(GreetingService.name);

  getGreeting(): any {
    const data = this.readDB();
    return data.greeting;
  }

  updateGreeting(greeting: string): any {
    const data = this.readDB();
    const oldGreeting = data.greeting;
    const newGreeting = greeting;

    data.greeting = newGreeting;
    this.writeToDB(data);
    this.logger.log(`Greeting updated from ${oldGreeting} to ${newGreeting}`);
    return 'Greeting updated.';
  }

  getCurrentTime(): string {
    const currentTime = new Date().toLocaleTimeString();
    return `The current time is: ${currentTime}`;
  }

  private readDB(): any {
    const rawData = fs.readFileSync(this.dataFilePath, 'utf-8');
    return JSON.parse(rawData);
  }

  private writeToDB(data: any): void {
    fs.writeFileSync(this.dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}
