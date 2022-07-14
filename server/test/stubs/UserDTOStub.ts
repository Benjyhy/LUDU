import { UserDto } from '../../src/modules/user/dto/user.dto';

export const UserDTOStub = (): UserDto => {
  return {
    _id: '2',
    address: '13 rue edgar degas',
    avatar: 'Williamproifle',
    credentials: undefined,
    phone: '0651828949',
    role: [undefined],
    stores: [],
    username: 'WillGam3r',
  };
};
