import { Controller, Get } from '@nestjs/common';
import { MembersEntity } from 'src/domain/members/members.entity';
import { MembersService } from 'src/domain/members/members.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @ApiOperation({ summary: 'Get all Members' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [MembersEntity],
  })
  @Get('/')
  async findAll(): Promise<MembersEntity[]> {
    try {
      const data = await this.membersService.findAll();
      const response: any = {
        meta: {
          code: 200,
          message: 'success',
          status: true,
        },
        data,
      };
      return response;
    } catch (error) {
      const response: any = {
        meta: {
          code: 500,
          message: 'Internal Server Error',
          status: false,
        },
      };
      return response;
    }
  }
}
