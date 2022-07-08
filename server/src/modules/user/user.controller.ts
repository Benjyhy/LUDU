import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDocument, User, ROLES } from 'src/schemas/user.schema';
import { UserDto } from './dto/user.dto';
import { JWTAuth } from 'src/middlewares/decorators/JWTAuth';
import { ObjectId } from 'mongoose';
import { Roles } from 'src/middlewares/decorators/RoleAuth';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  @JWTAuth()
  @ApiBearerAuth('JWT')
  @Roles(ROLES.SELLER)
  findAll(): Promise<UserDocument[]> {
    return this.userService.findAll();
  }

  @JWTAuth()
  @ApiBearerAuth('JWT')
  @Get('/:id')
  async findById(
    @Param('id')
    id: ObjectId,
  ): Promise<UserDocument> {
    return this.userService.findById(id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({ description: 'Success', type: User })
  update(
    @Param('id')
    id: string,
    @Body(new ValidationPipe({ transform: true }))
    locationDto: UserDto,
  ): Promise<UserDocument> {
    return this.userService.update(id, locationDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete an user' })
  @ApiOkResponse({ description: 'Success', type: User })
  async remove(
    @Param('id')
    id: string,
  ): Promise<void> {
    await this.userService.remove(id);
  }
}
