import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBooksDto {
  readonly id: number;
  @ApiProperty({ example: 'ABC123', description: 'The code of the book' })
  @IsString()
  @IsNotEmpty()
  code: string;
  @ApiProperty({
    example: 'The Great Gatsby',
    description: 'The title of the book',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty({
    example: 'F. Scott Fitzgerald',
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
