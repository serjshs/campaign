import { createProfiguration } from '@golevelup/profiguration';
import { Config } from './config.interface';

const config = createProfiguration<Config>({
  app: {
    port: {
      default: 3000,
      env: 'APP_PORT',
    },
    cors: {
      origin: {
        default: 'http://localhost:3000',
        env: 'APP_CORS_ORIGIN',
      },
    },
    logLevels: {
      default: ['error', 'warn', 'log', 'verbose', 'debug'],
      env: 'APP_LOG_LEVELS',
    },
  },
  database: {
    host: {
      default: 'localhost',
      env: 'DATABASE_HOST',
    },
    port: {
      default: 5432,
      env: 'DATABASE_PORT',
    },
    username: {
      default: 'postgres',
      env: 'DATABASE_USERNAME',
    },
    password: {
      default: 'postgres',
      env: 'DATABASE_PASSWORD',
    },
    database: {
      default: '',
      env: 'DATABASE_NAME',
    },
  },
  campaign: {
    api: {
      url: {
        default: '',
        env: 'CAMPAIGN_API_URL',
      },
      key: {
        default: '',
        env: 'CAMPAIGN_API_KEY',
      },
    },
  },
});

export default config;
