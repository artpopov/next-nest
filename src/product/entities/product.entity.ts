import { Column, Entity, ObjectIdColumn } from 'typeorm';

export type ProductData = PartialBy<ProductEntity, '_id'>;

@Entity()
export class ProductEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  oldPrice: number;

  @Column()
  credit: number;

  @Column()
  calculatedRating: number;

  @Column()
  description: string;

  @Column()
  advantages: string;

  @Column()
  disadvantages: string;

  @Column()
  categories: string[];

  @Column()
  tags: string;

  @Column()
  characteristics: {
    [key: string]: string;
  };

  constructor(data: ProductData) {
    Object.assign(this, data);
  }
}
