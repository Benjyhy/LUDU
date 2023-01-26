import { v4 } from 'uuid';
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Delete,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { ROLES, UserDocument } from '../../schemas/user.schema';
import { Roles } from '../../middlewares/decorators/RoleAuth';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  @Roles(ROLES.ADMIN)
  @ApiOperation({ summary: 'Get All user | need Admin' })
  @ApiOkResponse({ description: 'Success', type: UserDto, isArray: true })
  findAll(): Promise<UserDocument[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get user by Id' })
  @ApiOkResponse({ description: 'Success', type: UserDto })
  findById(@Param('id') id: string): Promise<UserDocument> {
    return this.userService.findById(id).then((store) => {
      if (!store) throw new NotFoundException(`Store #${id} not found`);
      return store;
    });
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiOkResponse({ description: 'Success', type: UserDto })
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
  @ApiOkResponse({ description: 'Success', type: UserDto })
  async remove(
    @Param('id')
    id: string,
  ): Promise<void> {
    await this.userService.remove(id);
  }
}
