import * as dotenv from 'dotenv-safe';

dotenv.config({ allowEmptyValues: false });

export const config = {
    db: {
      type: 'postgres',
      postgres: {
        host: 'localhost',
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        database: process.env.DB_NAME as string,
      },
      mysql: {
        // mysql connection details
        // helpful in migrating from mysql to postgres
      },
    },
  };
