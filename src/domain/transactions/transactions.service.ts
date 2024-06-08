import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MembersService } from '../members/members.service';
import { BooksService } from '../books/books.service';

import { BorrowBookDto } from 'src/application/dto/borrow-books.dto';
import { ReturnBookDto } from 'src/application/dto/return-books.dto';

import { MembersEntity } from '../members/members.entity';
import { BooksEntity } from '../books/books.entity';

import { Transactions } from 'src/infrastructure/models/transactions.model';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionRepository: Repository<Transactions>,
    private readonly membersService: MembersService,
    private readonly booksService: BooksService,
  ) {}

  async borrowBook(borrowBookDto: BorrowBookDto): Promise<void> {
    const { member_id, book_id, borrow_date } = borrowBookDto;

    const member: MembersEntity = await this.membersService.findOne(member_id);
    if (!member) {
      throw new Error('Member not found');
    }

    const book: BooksEntity = await this.booksService.findOne(book_id);

    if (!book) {
      throw new Error('Book not found');
    }

    if (book.stock <= 0) {
      throw new Error('Book is not available');
    }

    const activeBorrowings = await this.transactionRepository.find({
      where: { member_id, return_date: null },
    });

    if (activeBorrowings.length >= 2) {
      throw new Error('Members may not borrow more than 2 books');
    }

    if (member.is_penalty && member.penalty_until > new Date(borrow_date)) {
      throw new Error('Member is currently being penalized');
    }

    const transaction = new Transactions();
    transaction.member_id = member_id;
    transaction.book_id = book_id;
    transaction.borrow_date = borrow_date;

    await this.transactionRepository.save(transaction);

    book.stock -= 1;
    await this.booksService.save(book);

    member.is_penalty = false;
    member.penalty_until = null;
    await this.membersService.save(member);
  }

  async returnBook(returnBookDto: ReturnBookDto): Promise<void> {
    const { member_id, book_id, return_date } = returnBookDto;

    const member: MembersEntity = await this.membersService.findOne(member_id);
    if (!member) {
      throw new Error('Member not found');
    }

    const transaction = await this.transactionRepository.findOne({
      where: { member_id, book_id, return_date: null },
    });
    if (!transaction) {
      throw new Error('The returned book is not borrowed by this member');
    }

    const diffTime = Math.abs(
      new Date(return_date).getTime() -
        new Date(transaction.borrow_date).getTime(),
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 7) {
      member.penalty_until = new Date(
        new Date(return_date).getTime() + 3 * 24 * 60 * 60 * 1000,
      ); // 3 days penalty
      member.is_penalty = true;
    }

    transaction.return_date = return_date;
    await this.transactionRepository.save(transaction);

    const book: BooksEntity = await this.booksService.findOne(book_id);
    book.stock += 1;
    await this.booksService.save(book);

    await this.membersService.save(member);
  }
}
