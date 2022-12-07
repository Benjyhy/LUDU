import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { RolesGuard } from '../role.guard';

export function JWTAuth() {
  return applyDecorators(
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth('JWT'),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
    }),
  );
}
