import { Body, Controller, Post, ValidationPipe, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserDocument } from 'src/schemas/user.schema';
import { UserDto } from '../user/dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { saveImage } from 'src/helpers/Utils';
import appConfig from 'src/config/app.config';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/local/register')
  async create(
    @Body(new ValidationPipe({ transform: true }))
    userDto: UserDto,
  ): Promise<UserDocument> {
    await this.authService.checkUniqueField(userDto);
    userDto.avatar = await saveImage(
      userDto.avatar,
      `${appConfig().user.staticFolder}/avatar/`,
    );
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
