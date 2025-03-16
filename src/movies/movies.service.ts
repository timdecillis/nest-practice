import { Injectable, Logger } from '@nestjs/common';

import { Movies } from '../types/types';
import { readDB, writeToDB } from 'src/utils/utils';

@Injectable()
export class MovieService {
  private readonly logger = new Logger(MovieService.name);

  getMovies(): Movies | string {
    const data = readDB();
    const movies = data.movies;
    this.logger.log('fooooo');
    if (movies.length === 0) {
      return 'Nothing to see here, try adding a movie!';
    }
    return movies;
  }
  addMovie(movieToAdd): string {
    const data = readDB();
    data.movies.push(movieToAdd);
    writeToDB(data);
    this.logger.log(`${movieToAdd} added to your movie list.`);
    return 'Movie added.';
  }
  deleteMovie(movieToDelete): any {
    const data = readDB();
    if (!data.movies.includes(movieToDelete))
      return 'That movie is not on your list.';
    data.movies = data.movies.filter((movie) => movie !== movieToDelete);
    writeToDB(data);
    return 'Movie deleted.';
  }
}
