import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.PORT || 3000,
  database: {
    dev: process.env.DATABASE_URL,
    prod: process.env.DATABASE_URL_PRODUCTION,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
  },
  user: {
    staticFolder: process.env.STATIC_USER_FOLDER,
  },
  game: {
    staticFolder: process.env.STATIC_GAME_FOLDER,
  },
}));
