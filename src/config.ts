import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + '/../.env' });

const config = {
  app: {
    port: process.env.APP_PORT || 3000
  }
};

export { config };
