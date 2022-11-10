import { hashPassword } from '../helpers/Bcrypt';

const password = hashPassword('Default123');

export const userName = ['William', 'Paul', 'Bastien', 'Lena', 'Corina'];

export const userEmail = [
  'william@gmail.com',
  'Paul@gmail.com',
  'Bastien@gmail.com',
  'Lena@gmail.com',
  'Corina@gmail.com',
];

export const userAddress = [
  '13 ure de saint jean',
  '1 rue de georges baptiste',
  '13 rue edgar Degas',
  '1 rue du general Patin',
  '8 rue de la castellane',
];

export const userPhone = [
  '0619349594',
  '0659349390',
  '0648392040',
  '0654839205',
  '0638492319',
];

export const userCity = ['Paris', 'Lyon', 'Nancy', 'Lille', 'Bordeaux'];

export const userCredentiel = [
  {
    local: {
      email: 'user1@gmail.com',
      password: password,
      emailVerified: false,
    },
  },
  {
    local: {
      email: 'user2@gmail.com',
      password: password,
      emailVerified: false,
    },
  },
  {
    local: {
      email: 'user3@gmail.com',
      password: password,
      emailVerified: false,
    },
  },
  {
    local: {
      email: 'user4@gmail.com',
      password: password,
      emailVerified: false,
    },
  },
  {
    local: {
      email: 'user5@gmail.com',
      password: password,
      emailVerified: false,
    },
  },
];
