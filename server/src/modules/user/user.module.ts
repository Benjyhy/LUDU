import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Store, StoreSchema } from 'src/schemas/store.schema';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/middlewares/role.guard';

@Module({
  providers: [UserService, { provide: APP_GUARD, useClass: RolesGuard }],
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: User.name,
          schema: UserSchema,
        },
        {
          name: Store.name,
          schema: StoreSchema,
        },
      ],
      'mongo',
    ),
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
