import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { TopPageService } from './top-page.service';
import { TopPageModel } from './top-page.model/top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @Post()
  create(@Body() createTopPageDto: Omit<TopPageModel, '_id'>) {
    return this.topPageService.create(createTopPageDto);
  }

  @Get()
  findAll() {
    return this.topPageService.findAll();
  }

  @HttpCode(200)
  @Post()
  find(@Body() dto: FindTopPageDto) {
    return;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topPageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopPageDto: TopPageModel) {
    return this.topPageService.update(+id, updateTopPageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topPageService.remove(+id);
  }
}
