import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class TransactionsEntity {
  readonly id: number;

  @IsNumber()
  @IsNotEmpty()
  book_id: number;

  @IsString()
  @IsNotEmpty()
  member_id: number;

  @IsDate()
  borrow_date: Date;

  @IsDate()
  return_date: Date;
}
