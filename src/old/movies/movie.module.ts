import { Module } from '@nestjs/common';
import { MovieService } from './movies.service';
import { MovieController } from './movies.controller';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
