import { Module } from '@nestjs/common';
import { TopPageService } from './top-page.service';
import { TopPageController } from './top-page.controller';

@Module({
  controllers: [TopPageController],
  providers: [TopPageService],
})
export class TopPageModule {}
