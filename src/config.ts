import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + '/../.env' });

const config = {
  app: {
    port: process.env.APP_PORT || 3000
  },
  footballApp: {
      apiKey: process.env.FOOTBALL_DATA_API_KEY || '',
      baseUrl: process.env.FOOTBALL_DATA_URL || 'https://api.football-data.org',
      timeout: 3000
  },
  database: {
    type: process.env.TYPEORM_CONNECTION || 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 3306,
    name: process.env.DATABASE_SCHEMA || 'football_app',
    user: process.env.DATABASE_USER || 'nest',
    password: process.env.DATABASE_PASSWORD || 'secret',
    synchronize: process.env.SYNCHRONIZE || false,
    logEnabled: process.env.LOG_ENABLED || false
  }
};

export { config };
