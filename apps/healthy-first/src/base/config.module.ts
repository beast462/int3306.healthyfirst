import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { SupportedDatabaseTypes } from './type-orm.module';

export type Schema = {
  port: number;
  database: {
    type: SupportedDatabaseTypes;
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
  };
};

function load(): Schema {
  return {
    port: Number(process.env.PORT),
    database: {
      type: process.env.DB_TYPE as SupportedDatabaseTypes,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      name: process.env.DB_NAME,
    },
  };
}

const schema = Joi.object({
  PORT: Joi.number().min(1).max(65535).required(),
  DB_TYPE: Joi.string().valid(...SupportedDatabaseTypes),
  DB_HOST: Joi.alternatives(
    Joi.string().ip().required(),
    Joi.string().domain().required(),
    Joi.string().valid('localhost').required(),
  ),
  DB_PORT: Joi.number().min(1).max(65535).required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  DB_NAME: Joi.string().required(),
});

export enum ConfigKeys {
  SERVER_PORT = 'port',
  DATABASE_TYPE = 'database.type',
  DATABASE_HOST = 'database.host',
  DATABASE_PORT = 'database.port',
  DATABASE_USERNAME = 'database.username',
  DATABASE_PASSWORD = 'database.password',
  DATABASE_NAME = 'database.name',
}

export default ConfigModule.forRoot({
  envFilePath: ['.env', '.default.env'],
  load: [load],
  validationSchema: schema,
  validationOptions: {
    abortEarly: true,
  },
  cache: true,
});
