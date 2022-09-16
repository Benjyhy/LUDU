import { Module } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentController } from './rent.controller';
import { Rent, RentSchema } from '../../schemas/rent.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Copy, CopySchema } from 'src/schemas/copy.schema';
import { CopyModule } from '../copy/copy.module';
import { UserModule } from '../user/user.module';
@Module({
  imports: [
    CopyModule,
    UserModule,
    MongooseModule.forFeature(
      [
        {
          name: Rent.name,
          schema: RentSchema,
        },
        {
          name: User.name,
          schema: UserSchema,
        },
        {
          name: Copy.name,
          schema: CopySchema,
        },
      ],
      'mongo',
    ),
  ],
  controllers: [RentController],
  providers: [RentService],
  exports: [RentService],
})
export class RentModule {}
