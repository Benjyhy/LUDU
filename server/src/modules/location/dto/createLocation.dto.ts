import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class createLocationDto {
  @ApiProperty({
    example: 'Au beau jeu',
    description: 'The name of the store',
  })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: '78600',
    description: "Postal code of the store's address",
  })
  @IsNotEmpty()
  readonly postalCode: number;
}
