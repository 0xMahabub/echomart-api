import { DataSource, DataSourceOptions } from 'typeorm';
import 'reflect-metadata';
// import 'reflect-metadata'; use it in global @recommended

const dbConfigs: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'test',
  password: process.env.DB_PASS || 'test',
  database: process.env.DB_NAME || 'test',
  entities: ['src/**/*.entity.ts'],
  logging: true,
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
  // synchronize: false,
};

export const db = new DataSource(dbConfigs);
