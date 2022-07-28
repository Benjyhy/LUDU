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
import { GameDocument, Game } from 'src/schemas/game.schema';

export class CategoryDto {
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty({
    example: 'jeu de role',
    description: 'a game category',
  })
  @IsString()
  readonly name: string;
}
