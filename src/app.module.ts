import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/databases/database.module';
import { ConfigModule } from '@nestjs/config';
import dataSource from './infrastructure/databases/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from './infrastructure/models/books.model';
import { Members } from './infrastructure/models/members.model';
import { Transactions } from './infrastructure/models/transactions.model';
import { BooksController } from './application/controllers/books.controller';
import { MembersController } from './application/controllers/members.controller';
import { TransactionsController } from './application/controllers/transactions.controller';

import { BooksService } from './domain/books/books.service';
import { MembersService } from './domain/members/members.service';
import { TransactionsService } from './domain/transactions/transactions.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV || 'development'}`,
      load: [dataSource],
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([Books, Members, Transactions]),
  ],
  controllers: [
    AppController,
    BooksController,
    MembersController,
    TransactionsController,
  ],
  providers: [AppService, BooksService, MembersService, TransactionsService],
})
export class AppModule {}
