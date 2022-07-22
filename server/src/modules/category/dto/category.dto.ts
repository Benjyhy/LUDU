import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsBase64,
  IsNumber,
  IsArray,
  ValidateNested,
  ArrayMaxSize,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GameDocument } from 'src/schemas/game.schema';

export class CategoryDto {
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty({
    example: 'jeu de role',
    description: 'a game category',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'game ID',
    description: 'Mongoose ID related to a existing game',
  })
  readonly games: GameDocument[];
}
