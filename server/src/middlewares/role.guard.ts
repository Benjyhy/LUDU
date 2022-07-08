import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from 'src/schemas/user.schema';
import { ROLES_KEY } from './decorators/RoleAuth';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ROLES[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    Logger.log(requiredRoles);
    if (!requiredRoles) {
      return true;
    }
    const user = context.switchToHttp().getRequest();
    Logger.log(user);
    console.log(user.user);
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
