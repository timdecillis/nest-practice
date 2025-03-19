import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import { Movie, Movies } from 'src/types/types';

@Injectable()
export class PgDatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    this.pool = new Pool({
      connectionString,
    });
  }

  async onModuleInit() {
    await this.pool.connect();
    console.log('Connected to PostgreSQL');
  }

  async onModuleDestroy() {
    await this.pool.end();
    console.log('Database connection closed');
  }

  async getMovies(): Promise<Movies> {
    const { rows } = await this.pool.query('SELECT * FROM movies');
    return rows as Movies;
  }
  async addMovie(movie: Movie): Promise<Movies> {
    await this.pool.query(
      `INSERT INTO movies (title, director) VALUES ($1, $2)`,
      [movie.title, movie.director],
    );
    const { rows } = await this.pool.query('SELECT * FROM movies');
    return rows as Movies;
  }
  async deleteMovie(movie: Movie): Promise<Movies> {
    await this.pool.query(`DELETE FROM movies WHERE id = $1`, [movie.id]);
    const { rows } = await this.pool.query('SELECT * FROM movies');
    return rows as Movies;
  }
}
