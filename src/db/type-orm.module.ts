import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfiguration } from './db.configuration';
import { MongoConfigService } from './mongo/mongo-config.service';
import { MongoModule } from './mongo/mongo.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfiguration), MongoModule],
      useFactory: (
        dbConfig: ConfigType<typeof databaseConfiguration>,
        configService: MongoConfigService,
      ) => {
        return configService.createDefaultSettings(dbConfig.mongo);
      },
      inject: [databaseConfiguration.KEY, MongoConfigService],
    }),
  ],
})
export class TypeOrmTunerModule {}
