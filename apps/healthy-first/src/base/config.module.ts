import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

type Schema = {
  port: number;
};

function load(): Schema {
  return {
    port: Number(process.env.PORT),
  };
}

const schema = Joi.object({
  PORT: Joi.number().min(1).max(65535).required(),
});

export default ConfigModule.forRoot({
  envFilePath: ['.default.env', '.env'],
  load: [load],
  validationSchema: schema,
  validationOptions: {
    abortEarly: true,
  },
  cache: true,
});
