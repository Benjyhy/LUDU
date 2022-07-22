import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Game, GameSchema } from 'src/schemas/game.schema';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { GameModule } from '../game/game.module';

@Module({
  imports: [
    GameModule,
    MongooseModule.forFeature(
      [
        { name: Category.name, schema: CategorySchema },
        { name: Game.name, schema: GameSchema },
      ],
      'mongo',
    ),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
