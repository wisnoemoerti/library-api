import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BooksEntity {
  @ApiProperty({ example: 1, description: 'The unique identifier of the book' })
  readonly id: number;

  @ApiProperty({ example: 'JK-45', description: 'The code of the book' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: 'Harry Potter',
    description: 'The title of the book',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'J.K Rowling',
    description: 'The author of the book',
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ example: 10, description: 'The stock of the book' })
  @IsNumber()
  @IsNotEmpty()
  stock: number;
}
