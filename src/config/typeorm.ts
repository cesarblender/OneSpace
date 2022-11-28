import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User";

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
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
