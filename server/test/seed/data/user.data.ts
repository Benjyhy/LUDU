import { hashPassword } from '../../../src/helpers/Bcrypt';

const password = hashPassword('password');

export const users = [
  {
    postCode: '23723',
    address: '1 rue de georges baptiste',
    avatar: '6ecd936f-6d9b-4d4e-b147-db198e6b8b2c',
    phone: '0619349594',
    role: 'ADMIN',
    credentials: {
      local: {
        email: 'admin@gmail.com',
        password: password,
        emailVerified: false,
      },
    },
    username: 'admin',
  },
  {
    postCode: '88622',
    address: '1 rue de georges baptiste',
    avatar: '6ecd936f-6d9b-4d4e-b147-db198e6b8b2c',
    phone: '0659349390',
    role: 'SELLER',
    credentials: {
      local: {
        email: 'seller@gmail.com',
        password: password,
        emailVerified: false,
      },
    },
    username: 'seller',
  },
  {
    postCode: '41958',
    address: '13 rue edgar Degas',
    avatar: '6ecd936f-6d9b-4d4e-b147-db198e6b8b2c',
    phone: '0648392040',
    role: 'USER',
    credentials: {
      local: {
        email: 'user@gmail.com',
        password: password,
        emailVerified: false,
      },
    },
    username: 'user',
  },
];
