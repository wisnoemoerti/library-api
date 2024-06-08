import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Books } from 'src/infrastructure/models/books.model';
import { Seeder } from 'nestjs-seeder';
import { faker } from '@faker-js/faker';

@Injectable()
export class BooksSeeder implements Seeder {
  constructor(
    @InjectRepository(Books)
    private readonly booksRepository: Repository<Books>,
  ) {}

  async seed(): Promise<any> {
    const bookTitles = [
      "Harry Potter and the Philosopher's Stone",
      'The Lord of the Rings',
      'The Great Gatsby',
      'To Kill a Mockingbird',
      '1984',
      'Pride and Prejudice',
      'The Catcher in the Rye',
      'The Hobbit',
      'Fahrenheit 451',
      'Moby-Dick',
    ];

    const books = bookTitles.map((title) => ({
      code: faker.string.alphanumeric(5),
      title,
      author: faker.person.fullName(),
      stock: faker.number.int({ min: 1, max: 10 }),
    }));

    return this.booksRepository.save(books);
  }

  async drop(): Promise<any> {
    return this.booksRepository.delete({});
  }
}
