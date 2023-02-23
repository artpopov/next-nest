import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  image: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  price: number;

  @IsInt()
  oldPrice: number;

  @IsInt()
  credit: number;

  @IsInt()
  calculatedRating: number;

  @IsString()
  description: string;

  @IsString()
  advantages: string;

  @IsString()
  disadvantages: string;

  @IsString({ each: true })
  categories: string[];

  @IsString()
  tags: string;
  characteristics: {
    [key: string]: string;
  };
}
