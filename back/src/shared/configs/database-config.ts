import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import env from "./envs";

const { database } = env;

export const databaseConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: database.host,
  port: database.port,
  password: database.password,
  username: database.username,
  database: database.database,
  synchronize: true,
  logging: true,
};
