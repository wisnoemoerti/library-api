import { IsNotEmpty, IsString, IsBoolean, IsDate } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class MembersEntity {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the member',
  })
  readonly id: number;

  @ApiProperty({ example: 'M001', description: 'The code of member' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 'Angga', description: 'The name of member' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: true, description: 'The status of penalty' })
  @IsBoolean()
  @IsNotEmpty()
  is_penalty: boolean;

  @ApiProperty({ example: '2024-06-06', description: 'The Date of penalty' })
  @IsDate()
  penalty_until: Date;
}
