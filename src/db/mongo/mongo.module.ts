import { MongoConfigService } from './mongo-config.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [MongoConfigService],
  exports: [MongoConfigService],
})
export class MongoModule {}
