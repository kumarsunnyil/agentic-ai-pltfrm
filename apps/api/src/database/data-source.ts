/**
 * ------------------------------------------------------------
 * @file: src\database\data-source.ts
 * @description: Reusable Enterprise Dashboard Container Datasource.
 * @author: Sunil.S.Kumar
 * @date: 07-10-2026
 * @project: Enterprise Agentic AI Platform
 * ------------------------------------------------------------
 */
import 'reflect-metadata';
import 'dotenv/config';

import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: 'migrations',
});
