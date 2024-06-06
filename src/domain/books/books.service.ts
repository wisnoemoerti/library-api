import { Injectable } from '@nestjs/common';
import { CreateBooksDto } from 'src/application/dto/create-books.dto';
import { BooksEntity } from './books.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Books } from 'src/infrastructure/models/books.model';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private booksRepository: Repository<Books>,
  ) {}

  async findAll(): Promise<BooksEntity[]> {
    return await this.booksRepository.find();
  }

  async findOne(id: number): Promise<BooksEntity | undefined> {
    return await this.booksRepository.findOneBy({
      id,
    });
  }

  async create(createBooksDto: CreateBooksDto): Promise<BooksEntity> {
    return this.booksRepository.save(createBooksDto);
  }

  async save(book: BooksEntity): Promise<BooksEntity> {
    return await this.booksRepository.save(book);
  }
}
