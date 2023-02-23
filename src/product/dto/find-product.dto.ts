import { IsInt, IsOptional, IsString } from 'class-validator';

export class FindProductDto {
  @IsString()
  @IsOptional()
  category: string;

  @IsInt()
  @IsOptional()
  limit: number;
}
