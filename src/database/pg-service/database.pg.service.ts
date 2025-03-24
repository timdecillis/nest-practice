import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import { User, Users } from 'src/types/types';

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

  async getUsers(): Promise<Users> {
    const { rows } = await this.pool.query('SELECT * FROM users');
    return rows as Users;
  }
  async addUser(user: User): Promise<Users> {
    const { firstName, lastName, email, jobTitle, vehicle, favoriteAnimal } =
      user;
    await this.pool.query(
      `INSERT INTO users ("firstName", "lastName", "email", "jobTitle", "vehicle", "favoriteAnimal") VALUES ($1, $2, $3, $4, $5, $6)`,
      [firstName, lastName, email, jobTitle, vehicle, favoriteAnimal],
    );
    const { rows } = await this.pool.query('SELECT * FROM users');
    return rows as Users;
  }
  async deleteUserById(user: User): Promise<Users> {
    await this.pool.query(`DELETE FROM users WHERE id = $1`, [user.id]);
    const { rows } = await this.pool.query('SELECT * FROM users');
    return rows as Users;
  }
}
