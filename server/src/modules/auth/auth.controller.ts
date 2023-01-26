import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';
import { UserDocument } from '../../schemas/user.schema';
import appConfig from '../../config/app.config';
import { LoginDto } from './dto/login.dto';
import { saveImage } from '../../helpers/Utils';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/register')
  async create(
    @Body(new ValidationPipe({ transform: true }))
    userDto: UserDto,
  ): Promise<UserDocument> {
    await this.authService.checkUniqueField(userDto);
    if (userDto.avatar) {
      userDto.avatar = await saveImage(
        userDto.avatar,
        `${appConfig().user.staticFolder}/avatar/`,
      );
    }
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
