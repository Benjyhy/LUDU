import { Test, TestingModule } from '@nestjs/testing';
import appConfig from '../../src/config/app.config';
import { Connection } from 'mongoose';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import DbModule, { closeMongoConnection } from '../db-test-module';
import { RentService } from '../../src/modules/rent/rent.service';
import { RentController } from '../../src/modules/rent/rent.controller';
import { Copy, CopySchema } from '../../src/schemas/copy.schema';
import { UserService } from '../../src/modules/user/user.service';
import { CopyService } from '../../src/modules/copy/copy.service';
import { Rent, RentSchema } from '../../src/schemas/rent.schema';
import { User, UserSchema } from '../../src/schemas/user.schema';
import { rentsForUser1, rentsForUser2, rentsForUser3 } from './data/rent.data';
import { Game, GameSchema } from '../../src/schemas/game.schema';

export const RentSeed = () => {
  describe('Rent', () => {
    let userService: UserService;
    let copyService: CopyService;
    let rentService: RentService;
    let rentController: RentController;
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
            { name: User.name, schema: UserSchema },
            { name: Copy.name, schema: CopySchema },
            { name: Rent.name, schema: RentSchema },
            { name: Game.name, schema: GameSchema },
          ]),
        ],
        providers: [UserService, CopyService, RentService],
      }).compile();

      connection = await module.get(getConnectionToken());
      userService = module.get<UserService>(UserService);
      copyService = module.get<CopyService>(CopyService);
      rentService = module.get<RentService>(RentService);
      rentController = new RentController(
        rentService,
        copyService,
        userService,
      );
    });

    describe('seed', () => {
      it('', async () => {
        const users = await userService.findAll();
        const copies = await copyService.findByAvailability();

        for (let i = 0; i < rentsForUser1.length; i++) {
          const copyId = copies.shift()._id.toString();
          const userId = users[0]._id.toString();

          const rent = Object.assign({}, rentsForUser1[i], {
            game: copyId,
            user: userId,
            _id: undefined,
          });
          await rentController.create(rent);
        }

        for (let i = 0; i < rentsForUser2.length; i++) {
          const copyId = copies.shift()._id.toString();
          const userId = users[1]._id.toString();

          const rent = Object.assign({}, rentsForUser2[i], {
            game: copyId,
            user: userId,
            _id: undefined,
          });
          await rentController.create(rent);
        }

        for (let i = 0; i < rentsForUser3.length; i++) {
          const copyId = copies.shift()._id.toString();
          const userId = users[2]._id.toString();

          const rent = Object.assign({}, rentsForUser3[i], {
            game: copyId,
            user: userId,
            _id: undefined,
          });
          await rentController.create(rent);
        }

        const allrents = [...rentsForUser1, ...rentsForUser2, ...rentsForUser3];

        const result = await rentController.findAll();
        expect(result).toHaveLength(allrents.length);
      });
    });
    afterAll(async () => {
      await connection.close();
      await closeMongoConnection();
    });
  });
};
