import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductModel } from './model/product.model';
import { FindProductDto } from './dto/find-product.dto';
import { ReviewService } from '../review/review.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: MongoRepository<ProductEntity>,
    private reviewService: ReviewService,
  ) {}
  create(createProductDto: CreateProductDto): Promise<ProductModel> {
    return this.repository.save(new ProductEntity(createProductDto));
  }

  find(args: FindProductDto): Promise<ProductModel[]> {
    return this.repository.find({
      take: args.limit,
      where: { categories: args.category },
    });
  }

  findOne(id: string): Promise<ProductModel | null> {
    return this.repository.findOneBy(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.repository.findOneBy(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const updatedProduct = { ...product, ...updateProductDto };
    return this.repository.save(updatedProduct);
  }

  async remove(id: string): Promise<boolean> {
    await this.repository.delete(id);
    await this.reviewService.removeByProductId(id);
    return true;
  }
}
