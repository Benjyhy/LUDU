import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { RolesGuard } from '../role.guard';

export function JWTAuth() {
  console.log('in');
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    ApiBearerAuth('JWT'),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
    }),
  );
}
