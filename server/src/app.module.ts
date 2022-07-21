import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import { LocationModule } from './modules/location/location.module';
import { UserController } from './modules/user/user.controller';
import { StoreModule } from './modules/store/store.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { GameModule } from './modules/game/game.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    MongooseModule.forRoot(appConfig().database.url, {
      connectionName: 'mongo',
    }),
    LocationModule,
    StoreModule,
    AuthModule,
    UserModule,
    GameModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
