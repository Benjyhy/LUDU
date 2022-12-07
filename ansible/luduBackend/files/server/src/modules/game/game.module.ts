import { forwardRef, Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { Game, GameSchema } from 'src/schemas/game.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    forwardRef(() => CategoryModule),
    MongooseModule.forFeature(
      [
        { name: Game.name, schema: GameSchema },
        { name: Category.name, schema: CategorySchema },
      ],
      'mongo',
    ),
  ],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
