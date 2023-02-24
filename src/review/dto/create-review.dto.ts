import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

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
