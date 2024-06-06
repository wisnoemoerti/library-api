import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  book_id: number;

  @Column()
  member_id: number;

  @Column()
  borrow_date: Date;

  @Column({ nullable: true })
  return_date: Date;
}
