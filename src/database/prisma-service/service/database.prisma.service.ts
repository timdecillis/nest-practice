import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Movie, Movies } from 'src/types/types';

@Injectable()
export class PrismaDatabaseService {
  constructor(private readonly prisma: PrismaService) {}

  async getMovies(): Promise<Movies> {
    return await this.prisma.movies.findMany({});
  }
  async addMovie(movie: Movie): Promise<Movies> {
    await this.prisma.movies.create({
      data: {
        title: movie.title,
        director: movie.director,
      },
    });
    return await this.prisma.movies.findMany({});
  }
  async deleteMovieById(movie: Movie): Promise<Movies> {
    await this.prisma.movies.delete({
      where: {
        id: movie.id,
      },
    });
    return await this.prisma.movies.findMany({});
  }
}
