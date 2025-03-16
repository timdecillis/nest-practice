import { Module } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { DatabaseController } from './database/database.controller';

@Module({
  providers: [DatabaseService],
  controllers: [DatabaseController],
})
export class AppModule {}
