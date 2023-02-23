import { ObjectID } from 'typeorm';

export class ReviewModel {
  _id: ObjectID;
  productId: ObjectID;
  name: string;
  title: string;
  description: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
