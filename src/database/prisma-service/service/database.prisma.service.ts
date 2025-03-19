import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Movies } from 'src/types/types';

@Injectable()
export class PrismaDatabaseService {
  constructor(private readonly prisma: PrismaService) {}

  async getMovies(): Promise<Movies> {
    return await this.prisma.movies.findMany({});
  }
}
