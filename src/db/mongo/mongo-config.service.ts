import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface MongoConfigConnectOptions {
  host?: string;
  username?: string;
  password?: string;
  database: string;
}

@Injectable()
export class MongoConfigService {
  createDefaultSettings(
    dbConfig: MongoConfigConnectOptions,
  ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const mongoConnectionOptions = {
      host: dbConfig.host,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
    };

    return {
      ...mongoConnectionOptions,
      type: 'mongodb',
      autoLoadEntities: true,
    };
  }
}
