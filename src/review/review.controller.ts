import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewModel } from './review.model/review.model';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto): Promise<ReviewModel> {
    return this.reviewService.create(createReviewDto);
  }

  @Get('byProduct/:productId')
  async getByProduct(
    @Param('productId') productId: string,
  ): Promise<ReviewModel[]> {
    return this.reviewService.getByProductId(productId);
  }

  @Get()
  async findAll(): Promise<ReviewModel[] | null> {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ReviewModel | null> {
    return this.reviewService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<ReviewModel> {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.reviewService.remove(id);
  }
}
