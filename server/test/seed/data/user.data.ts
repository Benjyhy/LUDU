import { hashPassword } from '../../../src/helpers/Bcrypt';
import { UserDto } from '../../../src/modules/user/dto/user.dto';
import { ROLES } from '../../../src/schemas/user.schema';

const password = hashPassword('password');

export const users: UserDto[] = [
  {
    address: '1 rue de georges baptiste',
    avatar: '9d918d3c-d6c9-44aa-ac7f-087348f06c7e',
    phone: '0619349594',
    role: ROLES[ROLES.ADMIN],
    credentials: {
      local: {
        email: 'admin@gmail.com',
        password: password,
        emailVerified: false,
      },
    },
    username: 'admin',
    _id: undefined,
    stores: [],
  },
  {
    address: '1 rue de georges baptiste',
    avatar: '6ecd936f-6d9b-4d4e-b147-db198e6b8b2c',
    phone: '0659349390',
    role: ROLES[ROLES.SELLER],
    credentials: {
      local: {
        email: 'seller@gmail.com',
        password: password,
        emailVerified: false,
      },
    },
    username: 'seller',
    _id: undefined,
    stores: [],
  },
  {
    address: '13 rue edgar Degas',
    avatar: 'e68b684f-e6a2-4ace-ab66-7bbd6eb7510c',
    phone: '0648392040',
    role: ROLES[ROLES.USER],
    credentials: {
      local: {
        email: 'user@gmail.com',
        password: password,
        emailVerified: false,
      },
    },
    username: 'user',
    _id: undefined,
    stores: [],
  },
];
