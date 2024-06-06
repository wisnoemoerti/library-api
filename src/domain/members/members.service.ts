import { Injectable } from '@nestjs/common';
import { MembersEntity } from './members.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Members } from 'src/infrastructure/models/members.model';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Members)
    private membersRepository: Repository<Members>,
  ) {}

  async findAll(): Promise<MembersEntity[]> {
    return await this.membersRepository.find();
  }

  async findOne(id: number): Promise<MembersEntity | undefined> {
    return await this.membersRepository.findOneBy({
      id,
    });
  }

  async save(member: MembersEntity): Promise<MembersEntity> {
    return await this.membersRepository.save(member);
  }
}
