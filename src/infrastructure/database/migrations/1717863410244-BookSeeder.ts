import { Books } from 'src/infrastructure/models/books.model';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';

export class BookSeeder1717863410244 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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

    await queryRunner.manager.save(queryRunner.manager.create(Books, books));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM books WHERE code LIKE 'code-%'`);
  }
}
