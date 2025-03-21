import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Movie, Movies } from 'src/types/types';

@Injectable()
export class PrismaDatabaseService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.users.findMany({});
  }
  // async addMovie(movie: Movie): Promise<Movies> {
  //   await this.prisma.users.create({
  //     data: {
  //       title: movie.title,
  //       director: movie.director,
  //     },
  //   });
  //   return await this.prisma.users.findMany({});
  // }
  // async deleteMovieById(movie: Movie): Promise<Movies> {
  //   await this.prisma.users.delete({
  //     where: {
  //       id: movie.id,
  //     },
  //   });
  //   return await this.prisma.users.findMany({});
  // }
}
