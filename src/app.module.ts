import { Module, DynamicModule } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { PgDatabaseService } from './database/pg-service/database.pg.service';
import { PrismaDatabaseService } from './database/prisma-service/service/database.prisma.service';
import { DatabaseController } from './database/controller/database.controller';
import * as dotenv from 'dotenv';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

dotenv.config();

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'public'),
      serveRoot: '/',
    }),
  ],
})
export class AppModule {
  static register(): DynamicModule {
    const isUsingPrisma = process.env.DB_CLIENT === 'prisma';
    const databaseProvider = isUsingPrisma
      ? PrismaDatabaseService
      : PgDatabaseService;

    console.log(
      `Using ${isUsingPrisma ? 'Prisma' : 'pg'} for database queries`,
    );
    return {
      module: AppModule,
      providers: [
        PrismaService,
        {
          provide: 'DatabaseService',
          useClass: databaseProvider,
        },
      ],
      controllers: [DatabaseController],
      exports: ['DatabaseService'],
    };
  }
}
