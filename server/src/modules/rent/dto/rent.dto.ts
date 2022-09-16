import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class RentDto {
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty({
    example: "1970-01-01 00:00:01' UTC to '2038-01-19 03:14:07' UTC",
    description: 'Time where the game is delivered',
  })
  @IsString()
  readonly startDate: string;

  @ApiProperty({
    example: "1970-01-01 00:00:01' UTC to '2038-01-19 03:14:07' UTC",
    description: 'Time where the game is return',
  })
  @IsString()
  readonly endDate: string;

  @ApiProperty({
    example: '12',
    description: 'Number of Hours of the location',
  })
  @IsNumber()
  readonly duration: number;

  @ApiProperty({
    example: 'true',
    description: 'If the user got the location in present',
  })
  @IsBoolean()
  @IsOptional()
  readonly is_delivered: boolean;

  @ApiProperty({
    example: '62e16c1b3f6a897c767bec7d',
    description: "Id d'un User",
  })
  @IsString()
  readonly user: string;

  @ApiProperty({
    example: '62dafb6aabb3d527725fb11a',
    description: "Id d'une Copy d'un jeu",
  })
  @IsString()
  readonly game: string;
}
