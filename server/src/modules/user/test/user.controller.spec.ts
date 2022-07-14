import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { User, UserSchema } from '../../../schemas/user.schema';
import { userStub } from './stubs/user.stub';
import { UserDto } from '../dto/user.dto';

jest.mock('..gitgg/user.service');

describe('UserController', () => {
  let usersController: UserController;
  let usersService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    usersController = module.get<UserController>(UserController);
    usersService = module.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  describe('GetUser', () => {
    describe('when getUserId is called', () => {
      let user: User;
      beforeEach(async () => {
        user = await usersController.findById(userStub()._id);
      });
      test('then it should call UserService', () => {
        expect(usersService.findById).toBeCalledWith(userStub()._id);
      });
      test('the it should return an user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
  describe('CreateUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      // eslint-disable-next-line @typescript-eslint/ban-types
      let createUserDto: {};
      beforeEach(async () => {
        createUserDto = {
          address: userStub().address,
          avatar: userStub().avatar,
          credentials: userStub().credentials,
          phone: userStub().phone,
          role: [undefined],
          stores: [],
          username: userStub().username,
        };
      });
    });
  });
});
