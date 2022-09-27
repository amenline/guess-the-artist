import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Score } from './entity/Score';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT as string, 10),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Score],
  migrations: [],
  subscribers: [],
  ssl: { rejectUnauthorized: false },
});
