import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CopyDto {
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty({
    example: 'Game Mongoose ID',
    description: 'game ID',
  })
  @IsNotEmpty()
  readonly game: string;

  @ApiProperty({
    example: 'Store mongoose ID',
    description: 'store id',
  })
  @IsNotEmpty()
  readonly store: string;
}
