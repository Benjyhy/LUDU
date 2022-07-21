import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.PORT || 3000,
  database: {
    url: process.env.DATABASE_URL,
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
