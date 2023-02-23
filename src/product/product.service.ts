import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductModel } from './model/product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: MongoRepository<ProductEntity>,
  ) {}
  create(createProductDto: CreateProductDto): Promise<ProductModel> {
    return this.repository.save(new ProductEntity(createProductDto));
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy(id);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}
