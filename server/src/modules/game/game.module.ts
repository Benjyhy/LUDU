import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { Store, StoreSchema } from 'src/schemas/store.schema';
import { Game, GameSchema } from 'src/schemas/game.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Store.name, schema: StoreSchema },
        { name: Game.name, schema: GameSchema },
      ],
      'mongo',
    ),
  ],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
