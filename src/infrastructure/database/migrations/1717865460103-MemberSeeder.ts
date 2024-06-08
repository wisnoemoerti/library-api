import { Members } from 'src/infrastructure/models/members.model';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';

export class MemberSeeder1717865460103 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const members = Array.from({ length: 10 }).map(() => ({
      code: faker.string.alphanumeric(5),
      name: faker.person.fullName(),
    }));

    await queryRunner.manager.save(
      queryRunner.manager.create(Members, members),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM members WHERE code LIKE 'code-%'`);
  }
}
