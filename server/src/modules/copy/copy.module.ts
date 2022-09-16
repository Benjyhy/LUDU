import { Module } from '@nestjs/common';
import { CopyService } from './copy.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CopyController } from './copy.controller';
import { StoreSchema, Store } from 'src/schemas/store.schema';
import { GameSchema, Game } from 'src/schemas/game.schema';
import { CopySchema, Copy } from 'src/schemas/copy.schema';
import { StoreModule } from '../store/store.module';
import { GameModule } from '../game/game.module';

@Module({
  imports: [
    StoreModule,
    GameModule,
    MongooseModule.forFeature(
      [
        { name: Game.name, schema: GameSchema },
        { name: Store.name, schema: StoreSchema },
        { name: Copy.name, schema: CopySchema },
      ],
      'mongo',
    ),
  ],
  exports: [CopyService],
  controllers: [CopyController],
  providers: [CopyService],
})
export class CopyModule {}
