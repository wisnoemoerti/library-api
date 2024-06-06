// src/modules/transactions/dto/borrow-book.dto.ts
import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnBookDto {
  @ApiProperty({ example: 1, description: 'The member_id' })
  @IsNumber()
  @IsNotEmpty()
  member_id: number;

  @ApiProperty({ example: 1, description: 'The book_id' })
  @IsNumber()
  @IsNotEmpty()
  book_id: number;

  @ApiProperty({
    example: '2024-06-06',
    description: 'The Date of book returned ',
  })
  @IsDate()
  @IsNotEmpty()
  return_date: Date;
}
