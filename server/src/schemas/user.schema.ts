import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
import { hashPassword } from '../helpers/Bcrypt';
import { Review } from './review.schema';
import { phoneData, addressData } from '../seeders/data.seed';
import { Factory } from 'nestjs-seeder-impsdc';

export enum ROLES {
  USER = 'USER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
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
  @Factory((faker, ctx) => ctx.local)
  local: LocalAuth;

  @Prop({ type: Oauth })
  oauth: Oauth;
}

@Schema({ timestamps: true })
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Factory((faker) => faker.name.firstName())
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ type: Credentials })
  @Factory((faker, ctx) => ctx.credentials)
  credentials: Credentials;

  @Factory((faker, ctx) => ctx.role)
  @Prop({
    type: String,
    enum: ROLES,
    default: ROLES.USER,
  })
  role: ROLES;

  @Factory(() => phoneData.shift())
  @Prop({ required: true })
  phone: number;

  @Factory((faker, ctx) => ctx.avatar)
  @Prop()
  avatar: string;

  @Factory(() => addressData[Math.floor(Math.random() * addressData.length)])
  @Prop({ required: true })
  address: string;

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
