import { getAppDataSource } from "../config/typeorm";
import { User } from "../entity/User";

export const getUserRepository = async () =>
  (await getAppDataSource()).getRepository(User);
