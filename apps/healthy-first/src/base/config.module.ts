import { Environments } from '@/common/constants/environments';
import { ConfigModule } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { existsSync, readFileSync, statSync, writeFileSync } from 'fs';
import * as Joi from 'joi';
import { join } from 'path';
import { SupportedDatabaseTypes } from './type-orm.module';

export type Schema = {
  port: number;
  env: Environments;
  cookie: {
    secret?: string;
  };
  database: {
    type: SupportedDatabaseTypes;
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
  };
};

function loadCookieSecret(): string {
  const secretLocation = join(__dirname, 'cookie-secret');

  if (!existsSync(secretLocation) || statSync(secretLocation).isFile()) {
    const secret = randomBytes(32).toString('utf-8');

    writeFileSync(secretLocation, secret, 'utf-8');
    return secret;
  }

  return readFileSync(secretLocation, 'utf-8');
}

function load(): Schema {
  const env = ['development', 'production'].indexOf(process.env.ENVIRONMENT);

  return {
    port: Number(process.env.PORT),
    env,
    cookie: {
      secret: env === Environments.PRODUCTION ? loadCookieSecret() : undefined,
    },
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
  ENVIRONMENT: Joi.string()
    .valid('development', 'production')
    .default('production'),
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
  ENVIRONMENT = 'env',
  COOKIE_SECRET = 'cookie.secret',
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
