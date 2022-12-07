import { seeder } from 'nestjs-seeder-impsdc';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../schemas/category.schema';
import { Location, LocationSchema } from '../schemas/location.schema';
import { CategorySeeder } from '../modules/category/seed/category.seed';
import { GameSeeder } from '../modules/game/seed/game.seed';
import { Game, GameSchema } from '../schemas/game.schema';
import appConfig from '../config/app.config';
import { ConfigModule } from '@nestjs/config';

seeder({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: appConfig().database.prod,
      }),
    }),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Game.name, schema: GameSchema },
    ]),
  ],
}).run([CategorySeeder, GameSeeder]);
