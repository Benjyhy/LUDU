import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
export class RentDto {
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty({
    example: 'unix date',
    description: 'Timestamp in unix when the game is delivered',
  })
  @IsString()
  readonly startDate: string;

  @ApiPropertyOptional({
    example: 'unix date',
    description: 'Timestamp in unix when the game is return',
  })
  @IsString()
  @IsOptional()
  readonly endDate?: string;

  @ApiPropertyOptional({
    example: '1200000',
    description: 'Number of miliseconds of the location',
  })
  @IsNumber()
  @IsOptional()
  readonly duration?: number;

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
