import { Module } from '@nestjs/common';
import { GreetingModule } from './greeting/greeting.module';
import { MovieModule } from './movies/movie.module';

@Module({
  imports: [GreetingModule, MovieModule],
})
export class AppModule {}
