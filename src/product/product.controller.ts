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
import { ProductService } from './product.service';
//import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './model/product.model';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<ProductModel> {
    return this.productService.create(createProductDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductModel | null> {
    return this.productService.findOne(id);
  }

  @HttpCode(200)
  @Post()
  find(@Body() dto: FindProductDto): Promise<ProductModel[]> {
    return this.productService.find(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.productService.remove(id);
  }
}
