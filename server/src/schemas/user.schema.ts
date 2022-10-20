import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
import { hashPassword } from '../helpers/Bcrypt';
import { Review } from './review.schema';
import {
  userPhone,
  userAddress,
  userEmail,
  userName,
  userCity,
  userCredentiel,
} from '../seeders/user.data';
import { Factory } from 'nestjs-seeder-impsdc';

export enum ROLES {
  USER,
  SELLER,
  ADMIN,
}

export type UserDocument = User & Document;

export class Oauth {
  @Prop()
  token: string;

  @Prop()
  email: string;

  @Prop()
  name: string;
}

export class LocalAuth {
  @IsEmail()
  @Factory(() => userEmail.shift())
  @Prop({ unique: true })
  email: string;

  @Factory((faker, ctx) => ctx.password)
  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    select: false,
  })
  password: string;

  @Prop()
  @Factory((faker, ctx) => ctx.emailVerified)
  emailVerified: boolean;
}

export class Credentials {
  @Prop({ type: LocalAuth, select: false })
  local: LocalAuth;

  @Prop({ type: Oauth })
  oauth: Oauth;
}

@Schema({ timestamps: true })
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Factory(() => userName.shift())
  @Prop({ unique: true, required: true })
  username: string;

  @Factory(() => userCredentiel.shift())
  @Prop({ type: Credentials })
  credentials: Credentials;

  @Factory((faker, ctx) => ctx.role)
  @Prop({ type: String, enum: ['USER', 'SELLER', 'ADMIN'], required: true })
  role: ROLES;

  @Factory(() => userPhone.shift())
  @Prop({ required: true })
  phone: number;

  @Factory((faker, ctx) => ctx.avatar)
  @Prop()
  avatar: string;

  @Factory(() => userAddress.shift())
  @Prop({ required: true })
  address: string;

  @Factory(() => userCity.shift())
  @Prop({ required: true })
  city: string;

  @Factory((faker) => faker.random.numeric(5))
  @Prop({ required: true })
  postCode: number;

  @Prop({ type: Types.ObjectId, ref: 'Store' })
  store: string;

  @Prop({ type: [Types.ObjectId], ref: 'Review', default: [] })
  reviews: Review[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (user.credentials.local.password) {
    // if (isPasswordInvalid(user.credentials.local.password))
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.BAD_REQUEST,
    //       error: 'password:invalid:min(8)|required(upper,lower,number)',
    //     },
    //     HttpStatus.BAD_REQUEST,
    //   );

    this.credentials.local.password = hashPassword(
      this.credentials.local.password,
    );
  }
  next();
});
