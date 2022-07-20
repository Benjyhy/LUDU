import { Body, Controller, Post, ValidationPipe, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserDocument } from 'src/schemas/user.schema';
import { UserDto } from '../user/dto/user.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  readonly avatarPath = `${process.env.STATIC_USER_FOLDER}/thumbnail/`;

  @Post('/local/register')
  async create(
    @Body(new ValidationPipe({ transform: true }))
    userDto: UserDto,
  ): Promise<UserDocument> {
    return this.authService.register(userDto);
  }

  @Post('/local/login')
  login(
    @Body(new ValidationPipe({ transform: true }))
    userLogin: LoginDto,
  ): Promise<boolean> {
    return this.authService.login(userLogin);
  }
}
