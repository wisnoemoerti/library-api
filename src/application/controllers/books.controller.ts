import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { BooksEntity } from 'src/domain/books/books.entity';
import { BooksService } from 'src/domain/books/books.service';
import { CreateBooksDto } from '../dto/create-books.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [BooksEntity],
  })
  @Get('/')
  async findAll(): Promise<any> {
    try {
      const data = await this.booksService.findAll();
      return {
        meta: {
          code: 200,
          message: 'success',
          status: true,
        },
        data,
      };
    } catch (error) {
      return {
        meta: {
          code: 500,
          message: 'Internal Server Error',
          status: false,
        },
      };
    }
  }

  @ApiOperation({ summary: 'Get book by ID' })
  @ApiResponse({ status: 200, description: 'Success', type: BooksEntity })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<BooksEntity> {
    const book = await this.booksService.findOne(id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.',
    type: BooksEntity,
  })
  @Post('/')
  async create(@Body() createBooksDto: CreateBooksDto): Promise<BooksEntity> {
    return await this.booksService.create(createBooksDto);
  }
}
