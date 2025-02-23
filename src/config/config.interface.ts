export interface Config {
  app: {
    port: {
      default: number;
      env: string;
    };
    logLevels: {
      default: string[];
      env: string;
    };
    cors: {
      origin: {
        default: string;
        env: string;
      };
    };
  };
  database: {
    host: {
      default: string;
      env: string;
    };
    port: {
      default: number;
      env: string;
    };
    username: {
      default: string;
      env: string;
    };
    password: {
      default: string;
      env: string;
    };
    database: {
      default: string;
      env: string;
    };
  };
  campaign: {
    api: {
      url: {
        default: string;
        env: string;
      };
      key: {
        default: string;
        env: string;
      };
    };
  };
}
