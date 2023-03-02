import { Game, GameSchema } from './../../src/schemas/game.schema';
import { Copy, CopySchema } from './../../src/schemas/copy.schema';
import { GameService } from './../../src/modules/game/game.service';
import { Test, TestingModule } from '@nestjs/testing';
import appConfig from '../../src/config/app.config';
import { Connection } from 'mongoose';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import DbModule, { closeMongoConnection } from '../db-test-module';
import { Location, LocationSchema } from '../../src/schemas/location.schema';
import { Store, StoreSchema } from '../../src/schemas/store.schema';
import { CopyService } from '../../src/modules/copy/copy.service';
import { StoreService } from '../../src/modules/store/store.service';
import { CopyController } from '../../src/modules/copy/copy.controller';
import { Category, CategorySchema } from '../../src/schemas/category.schema';

export const CopySeed = () => {
  describe('Copy', () => {
    let copyController: CopyController;
    let gameService: GameService;
    let copyService: CopyService;
    let storeService: StoreService;
    let connection: Connection;

    beforeAll(async () => {
      jest.setTimeout(60000);
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          ConfigModule.forRoot({
            load: [appConfig],
          }),
          DbModule({
            uri: appConfig().database.prod,
          }),
          MongooseModule.forFeature([
            { name: Store.name, schema: StoreSchema },
            { name: Copy.name, schema: CopySchema },
            { name: Game.name, schema: GameSchema },
            { name: Category.name, schema: CategorySchema },
            { name: Location.name, schema: LocationSchema },
          ]),
        ],
        controllers: [CopyController],
        providers: [GameService, CopyService, StoreService],
      }).compile();

      connection = await module.get(getConnectionToken());
      gameService = module.get<GameService>(GameService);
      copyService = module.get<CopyService>(CopyService);
      storeService = module.get<StoreService>(StoreService);
      copyController = new CopyController(copyService, storeService, gameService);
    });

    test('seed', async () => {
      const stores = await storeService.findAll();
      const games = await gameService.findAll();
      const copies = [];
      for (let i = 0; i < 60; i++) {
        const storesId =
          stores[Math.round(Math.floor(Math.random() * stores.length))]._id.toString();

        const gamesId = games[Math.round(Math.floor(Math.random() * games.length))]._id.toString();

        copies.push({
          game: gamesId,
          store: storesId,
          _id: undefined,
          available: true,
        });
      }

      await Promise.all(
        copies.map(async (item) => {
          await copyController.create(item);
        }),
      );
      const result = await copyService.findAll();
      expect(result).toHaveLength(60);
    });

    afterAll(async () => {
      await connection.close();
      await closeMongoConnection();
    });
  });
};
