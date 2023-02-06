import { Injectable } from '@nestjs/common';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { UpdateTopPageDto } from './dto/update-top-page.dto';

@Injectable()
export class TopPageService {
  create(createTopPageDto: CreateTopPageDto) {
    return 'This action adds a new topPage';
  }

  findAll() {
    return `This action returns all topPage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topPage`;
  }

  update(id: number, updateTopPageDto: UpdateTopPageDto) {
    return `This action updates a #${id} topPage`;
  }

  remove(id: number) {
    return `This action removes a #${id} topPage`;
  }
}
