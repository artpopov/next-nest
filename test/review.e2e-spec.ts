import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import * as mongodb from 'mongodb';
import { Connection } from 'typeorm';

const productId = new mongodb.ObjectID().toString();

const testDto: CreateReviewDto = {
  name: 'test',
  title: 'Заголовок',
  description: 'Тестовое описание',
  rating: 5,
  productId,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let connection: Connection;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    connection = moduleFixture.get(getConnectionToken());
  });

  it('/review (POST) -  success', () => {
    return request(app.getHttpServer())
      .post('/review')
      .send(testDto)
      .expect(201)
      .then(({ body }) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
        return;
      });
  });

  it('/review/byProduct/:productId (GET) - success', () => {
    return request(app.getHttpServer())
      .get('/review/byProduct/' + productId)
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(1);
        expect(body[0]._id).toBe(createdId);
        return;
      });
  });

  it('/review/byProduct/:productId (GET) - fail', () => {
    return request(app.getHttpServer())
      .get('/review/byProduct/' + new mongodb.ObjectID().toString())
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(0);
        return;
      });
  });

  it('/review/:id (DELETE) - success', () => {
    return request(app.getHttpServer())
      .delete('/review/' + createdId)
      .expect(200)
      .then((res) => {
        expect(Boolean(res.text)).toBe(true);
        return;
      });
  });

  it('/review/:id (DELETE) - fail', () => {
    return request(app.getHttpServer())
      .delete('/review/' + new mongodb.ObjectID().toString())
      .expect(404);
  });

  afterEach(async () => {
    await connection.close();
  });
});
