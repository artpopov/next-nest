import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

interface IDatabaseConfig {
  mongo: {
    host?: string;
    username?: string;
    password?: string;
    database: string;
  };
}

export const databaseConfiguration = registerAs('database', async () => {
  const schema = Joi.object({
    mongo: Joi.object({
      host: Joi.string().empty(),
      username: Joi.string().empty(),
      password: Joi.string().empty(),
      database: Joi.string().required(),
    }),
  });
  const value = {
    mongo: {
      host: process.env.MONGO_HOST,
      username: process.env.MONGO_LOGIN,
      password: process.env.MONGO_PASSWORD,
      database: process.env.MONGO_AUTH_DATABASE,
    },
  };

  Joi.attempt(value, schema);

  return value as IDatabaseConfig;
});
