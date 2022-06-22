// import { Request, Response, NextFunction } from 'express';
// import { Logger } from '@nestjs/common';

// export function RoleAuth(req: Request, res: Response, next: NextFunction) {
//   Logger.log(req);
//   console.log(req);
//   next();
// }

import { SetMetadata } from '@nestjs/common';
import { ROLES } from 'src/schemas/user.schema';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ROLES[]) => SetMetadata(ROLES_KEY, roles);
