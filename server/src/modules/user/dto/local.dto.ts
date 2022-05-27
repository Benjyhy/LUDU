import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export interface ILocal {
  email: string;
  password: string;
  emailVerified: boolean;
}

export class LocaDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly emailVerified: boolean;
}
