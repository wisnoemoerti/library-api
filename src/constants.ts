import * as dotenv from 'dotenv';
dotenv.config();

export const TypeOrmConfig = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.model{.ts,.js}'],
  migrations: ['dist/infrastructure/database/migrations/*{.ts,.js}'],
  seeds: ['dist/infrastructure/database/seeds/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
  logging: false,
  cli: {
    migationsDir: 'dist/infrastructure/database/migrations',
  },
};

export const APP_PORT = process.env.PORT || 3000;
