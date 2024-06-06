import { Body, Controller, Post } from '@nestjs/common';
import { TransactionsService } from 'src/domain/transactions/transactions.service';
import { BorrowBookDto } from '../dto/borrow-books.dto';
import { ReturnBookDto } from '../dto/return-books.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiOperation({ summary: 'Transaction Borrow Books' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Post('borrow')
  async borrowBook(@Body() borrowBookDto: BorrowBookDto): Promise<any> {
    try {
      await this.transactionsService.borrowBook(borrowBookDto);
      return {
        meta: {
          code: 200,
          message: 'Book borrowed successfully',
          status: true,
        },
      };
    } catch (error) {
      return {
        meta: {
          code: 400,
          message: error.message,
          status: false,
        },
      };
    }
  }

  @ApiOperation({ summary: 'Transaction Return Books' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Post('return')
  async returnBook(@Body() returnBookDto: ReturnBookDto): Promise<any> {
    try {
      await this.transactionsService.returnBook(returnBookDto);
      return {
        meta: {
          code: 200,
          message: 'Book returned successfully',
          status: true,
        },
      };
    } catch (error) {
      return {
        meta: {
          code: 400,
          message: error.message,
          status: false,
        },
      };
    }
  }
}
