import { DataSource } from 'typeorm';
import * as path from 'path';
import config from 'src/config/config';
import { DatabaseNamingStrategy } from './database-naming.strategy';

export const dataSource = new DataSource({
  type: 'postgres',
  host: config.get('database.host'),
  port: config.get('database.port'),
  username: config.get('database.username'),
  password: config.get('database.password'),
  database: config.get('database.database'),
  entities: [path.join(__dirname, 'entities', '*.entity.{js,ts}')],
  migrations: [path.join(__dirname, 'migrations', '*.{js,ts}')],
  synchronize: true,
  migrationsRun: true,
  namingStrategy: new DatabaseNamingStrategy(),
});
