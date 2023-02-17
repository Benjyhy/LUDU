import { Test, TestingModule } from '@nestjs/testing';
import { CopyController } from './copy.controller';
import { CopyService } from './copy.service';
import { GameService } from '../game/game.service';
import { StoreService } from '../store/store.service';

jest.mock('./copy.service');
jest.mock('../game/game.service');
jest.mock('../store/store.service');

describe('CopyController', () => {
  let controller: CopyController;
  let copyService: CopyService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CopyController],
      providers: [CopyService, StoreService, GameService],
    }).compile();

    controller = module.get<CopyController>(CopyController);
    copyService = module.get<CopyService>(CopyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
