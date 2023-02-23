import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ReviewEntity } from './entities/review.entity';
import { ReviewModel } from './review.model/review.model';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private repository: MongoRepository<ReviewEntity>,
  ) {}

  create(createReviewDto: CreateReviewDto): Promise<ReviewModel> {
    return this.repository.save(new ReviewEntity(createReviewDto));
  }

  getByProductId(productId: string): Promise<ReviewModel[]> {
    return this.repository.find({ where: { productId } });
  }

  findOne(id: string): Promise<ReviewModel | null> {
    return this.repository.findOneBy(id);
  }

  async update(
    id: string,
    updateReviewDto: UpdateReviewDto,
  ): Promise<ReviewModel> {
    const review = await this.repository.findOneBy(id);
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    const updatedReview = { ...review, ...updateReviewDto };
    return this.repository.save(updatedReview);
  }

  async remove(id: string): Promise<boolean> {
    await this.repository.delete(id);
    return true;
  }

  async removeByProductId(productId: string): Promise<boolean> {
    const entities = await this.repository.findBy({ where: { productId } });
    await this.repository.remove(entities);
    return true;
  }
}
