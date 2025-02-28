import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { Movies } from '../types/types';

@Injectable()
export class MovieService {
  private dataFilePath = path.join(__dirname, '../db.json');
  private readonly logger = new Logger(MovieService.name);

  getMovies(): Movies | string {
    const data = this.readDB();
    const movies = data.movies;
    if (movies.length === 0) {
      return 'Nothing to see here, try adding a movie!';
    }
    return movies;
  }
  addMovie(movieToAdd): string {
    const data = this.readDB();
    data.movies.push(movieToAdd);
    this.writeToDB(data);
    this.logger.log(`${movieToAdd} added to your movie list.`);
    return 'Movie added.';
  }
  deleteMovie(movieToDelete): any {
    const data = this.readDB();
    if (!data.movies.includes(movieToDelete))
      return 'That movie is not on your list.';
    data.movies = data.movies.filter((movie) => movie !== movieToDelete);
    this.writeToDB(data);
    return 'Movie deleted.';
  }
  private readDB(): any {
    const rawData = fs.readFileSync(this.dataFilePath, 'utf-8');
    return JSON.parse(rawData);
  }

  private writeToDB(data: any): void {
    fs.writeFileSync(this.dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}
