import { Module } from '@nestjs/common';
import { CopyService } from './copy.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CopyController } from './copy.controller';
import { StoreModule } from '../store/store.module';
import { GameModule } from '../game/game.module';
import { Game, GameSchema } from '../../schemas/game.schema';
import { Store, StoreSchema } from '../../schemas/store.schema';
import { Copy, CopySchema } from '../../schemas/copy.schema';

@Module({
  imports: [
    StoreModule,
    GameModule,
    MongooseModule.forFeature([
      { name: Game.name, schema: GameSchema },
      { name: Store.name, schema: StoreSchema },
      { name: Copy.name, schema: CopySchema },
    ]),
  ],
  exports: [CopyService],
  controllers: [CopyController],
  providers: [CopyService],
})
export class CopyModule {}
