import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReviewService } from './review.service';
import { ReviewEntity } from './entities/review.entity';
import { MongoRepository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import * as mongodb from 'mongodb';
import { ObjectID } from 'mongodb';

const productId = new mongodb.ObjectID().toString();

const testReviewDto: CreateReviewDto = {
  name: 'test',
  title: 'Заголовок',
  description: 'Тестовое описание',
  rating: 5,
  productId,
};

describe('ReviewService', () => {
  let service: ReviewService;
  let repo: MongoRepository<ReviewEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: getRepositoryToken(ReviewEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    repo = module.get<MongoRepository<ReviewEntity>>(
      getRepositoryToken(ReviewEntity),
    );
  });

  it('should return an array of examples', async () => {
    const example = new ReviewEntity({
      ...testReviewDto,
      productId: ObjectID.createFromHexString(testReviewDto.productId),
    });

    jest.spyOn(repo, 'find').mockResolvedValue([example]);

    const result = await service.findAll();

    expect(result).toEqual([example]);
  });
});
