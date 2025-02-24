import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import config from '../config/config';
import { DatabaseNamingStrategy } from './database-naming.strategy';

console.log(config.get('database.password'));

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.get('database.host'),
  port: config.get('database.port'),
  username: config.get('database.username'),
  password: config.get('database.password'),
  database: config.get('database.database'),
  entities: [path.join(__dirname, 'entities', '*.entity.{js,ts}')],
  migrations: [path.join(__dirname, 'migrations', '*.{js,ts}')],
  synchronize: false,
  autoLoadEntities: true,
  migrationsRun: true,
  namingStrategy: new DatabaseNamingStrategy(),
};
