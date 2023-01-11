import { Test, TestingModule } from '@nestjs/testing';
import appConfig from '../../src/config/app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { StoreService } from '../../src/modules/store/store.service';
import { LocationService } from '../../src/modules/location/location.service';
import { GameService } from '../../src/modules/game/game.service';
import { RentService } from '../../src/modules/rent/rent.service';
import { CopyService } from '../../src/modules/copy/copy.service';
import { UserService } from '../../src/modules/user/user.service';
import { ReviewService } from '../../src/modules/review/review.service';
import { CategoryService } from '../../src/modules/category/category.service';
import { Store, StoreSchema } from '../../src/schemas/store.schema';
import { Copy, CopySchema } from '../../src/schemas/copy.schema';
import { Rent, RentSchema } from '../../src/schemas/rent.schema';
import { stores } from './data/store.data';
import { games } from './data/game.data';
import { Review, ReviewSchema } from '../../src/schemas/review.schema';
import { Game, GameSchema } from '../../src/schemas/game.schema';
import { User, UserSchema } from '../../src/schemas/user.schema';
import { Category, CategorySchema } from '../../src/schemas/category.schema';
import { Location, LocationSchema } from '../../src/schemas/location.schema';

describe('Store seed', () => {
  let storeService: StoreService;
  let locationService: LocationService;
  let userService: UserService;
  let rentService: RentService;
  let reviewService: ReviewService;
  let copyService: CopyService;
  let categoryService: CategoryService;
  let gameService: GameService;

  beforeAll(async () => {
    jest.setTimeout(60000);
    const module: TestingModule = await Test.createTestingModule({
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
          { name: Location.name, schema: LocationSchema },
          { name: Store.name, schema: StoreSchema },
          { name: User.name, schema: UserSchema },
          { name: Copy.name, schema: CopySchema },
          { name: Rent.name, schema: RentSchema },
          { name: Review.name, schema: ReviewSchema },
        ]),
      ],
      providers: [
        StoreService,
        LocationService,
        UserService,
        RentService,
        ReviewService,
        CopyService,
        CategoryService,
        GameService,
      ],
    }).compile();

    storeService = module.get<StoreService>(StoreService);
    locationService = module.get<LocationService>(LocationService);
    userService = module.get<UserService>(UserService);
    rentService = module.get<RentService>(RentService);
    reviewService = module.get<ReviewService>(ReviewService);
    copyService = module.get<CopyService>(CopyService);
    categoryService = module.get<CategoryService>(CategoryService);
    gameService = module.get<GameService>(GameService);
  });

  // describe('seed', () => {
  //   it('Seed stores', async () => {
  //     const locations = await locationService.findAll();
  //     const storesWithLocation = stores.map((store) => {
  //       const locationId =
  //         locations[
  //           Math.round(Math.floor(Math.random() * locations.length))
  //         ]._id.toString();

  //       return Object.assign({}, store, { location: locationId });
  //     });
  //     storesWithLocation.map(async (item) => {
  //       await storeService.create(await item);
  //     });
  //   });
  // });

  describe('seed', () => {
    it('get faked data', async () => {
      const users = await storeService.findAll();
      expect(users).toHaveLength(4);
    });
  });

  // describe('seed', () => {
  //   it('Seed games', async () => {
  //     const categories = await categoryService.findAll();
  //     const gameWithCategory = games.map((element) => {
  //       const categoryId =
  //         categories[
  //           Math.round(Math.floor(Math.random() * categories.length))
  //         ]._id.toString();

  //       return Object.assign({}, element, {
  //         categories: [categoryId],
  //         _id: undefined,
  //       });
  //     });
  //     gameWithCategory.map(async (item) => {
  //       await gameService.create(await item);
  //     });
  //   });
  // });

  describe('seed', () => {
    it('get faked data', async () => {
      const users = await gameService.findAll();
      expect(users).toHaveLength(9);
    });
  });
});
