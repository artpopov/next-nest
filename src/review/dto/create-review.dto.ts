import { ReviewEntityData } from '../entities/review.entity';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ObjectID } from 'typeorm';

export class CreateReviewDto implements ReviewEntityData {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  productId: ObjectID;

  @IsOptional()
  @IsInt()
  rating: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}
