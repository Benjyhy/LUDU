import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsPhoneNumber, IsBase64 } from 'class-validator';
import { ROLES } from 'src/schemas/user.schema';
import { StoreDocument } from 'src/schemas/store.schema';

import { OauthDto } from './oauth.dto';
import { LocalDto } from './local.dto';

interface ICredentials {
  local: LocalDto;
  oauth: OauthDto;
}

class LocalProperty {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  emailVerified: boolean;
}
class CredentialsProperty {
  @ApiProperty({ type: LocalProperty })
  local: LocalProperty;
}

export class UserDto {
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty({
    example: 'USER | SELLER | ADMIN',
    description: "User's role",
  })
  @IsNotEmpty()
  @IsString()
  readonly role: [ROLES];

  @ApiProperty({
    example: 'popolito',
    description: 'Your nickname',
  })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ type: CredentialsProperty })
  @ApiProperty()
  credentials: ICredentials;

  @ApiProperty({
    example: '+33620202020',
    description: "User's phone number",
  })
  @IsNotEmpty()
  @IsPhoneNumber('FR')
  phone: string;

  @ApiProperty({
    example: "User's address",
    description: '16 rue de beaumont, Montesson 78360',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiPropertyOptional({ description: 'avatar' })
  // @IsNotEmpty()
  @IsBase64()
  avatar: string;

  @ApiProperty({
    example: 'Store ID',
    description: 'Mongoose ID related to a existing store',
  })
  @ApiPropertyOptional({ description: 'Stores' })
  readonly stores: StoreDocument[];
}
