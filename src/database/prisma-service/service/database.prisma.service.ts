import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class PrismaDatabaseService {
  constructor(private readonly prisma: PrismaService) {}

  async getMovies() {
    console.log('prisma');
    return await this.prisma.movies.findMany({
      orderBy: {
        ID: 'asc',
      },
    });
  }
}
