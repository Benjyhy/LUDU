import {
  Injectable,
  Logger,
  NotFoundException,
  SetMetadata,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../modules/auth/auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import appConfig from 'src/config/app.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfig().auth.jwtSecret,
    });
  }

  async validate(payload) {
    const userValide = await this.authService.validateUser(payload);

    if (!userValide) {
      throw new NotFoundException(`Token has been corrupted`);
    }
    return payload;
  }
}
