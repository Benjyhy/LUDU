import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsBase64,
  IsNumber,
  IsArray,
  ArrayMaxSize,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RentDto {
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty({
    example: '8435407619432',
    description: 'Codebar of the game',
  })
  @IsString()
  readonly startDate: string;

  @ApiProperty({
    example: 'Catan',
    description: 'The name of the game',
  })
  @IsString()
  readonly endDate: string;

  @ApiProperty({
    example: 'Version Maritime',
    description: 'Différentiation des différentes version du jeu ',
  })
  @IsString()
  readonly duration: string;

  @ApiProperty({
    example:
      "Lance-toi à la conquête d'une île vierge mais pleine de ressources. Sauras-tu construire tes villes et colonies plus vite que tes adversaires ? Un classique au succès mondial, qui revient avec un nouveau design. Construis ta route vers la victoire ! Dès 10 ans.",
    description: 'Description du jeu',
  })
  @IsString()
  readonly is_delivered: string;

  @ApiProperty({
    example: '62e16c1b3f6a897c767bec7d',
    description: "Id d'un User",
  })
  readonly user: string;

  @ApiProperty({
    example: '62dafb6aabb3d527725fb11a',
    description: "Id d'une Copy d'un jeu",
  })
  readonly game: string;
}
