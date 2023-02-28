import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @ObjectIdColumn()
  _id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }
}
