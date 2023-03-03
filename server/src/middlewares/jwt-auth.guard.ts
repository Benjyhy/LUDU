import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    // Token is not valid from the validateUser auth service
    if (user === false) {
      throw new NotFoundException(`Bearer Token no found`);
    }
    return user;
  }
}
