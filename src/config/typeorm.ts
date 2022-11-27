import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST as string,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DATABASE as string,
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
});

const initialize = async () =>
  !AppDataSource.isInitialized && AppDataSource.initialize();

export const getAppDataSource = async () => {
  await initialize();

  return AppDataSource;
};
