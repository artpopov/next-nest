import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

export type ReviewEntityData = Omit<
  ReviewEntity,
  '_id' | 'createdAt' | 'updatedAt'
>;

@Entity('reviews')
export class ReviewEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  rating: number;

  @Column({ type: 'string' })
  productId: ObjectID;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(private data: ReviewEntityData) {
    Object.assign(this, data);
  }
}
