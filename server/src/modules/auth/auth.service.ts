import {
  Injectable,
  NotFoundException,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserDto } from '../user/dto/user.dto';
import { ObjectId } from 'mongoose';
import { ROLES } from '../../schemas/user.schema';
import { comparePassword } from '../../helpers/Bcrypt';

interface AuthToken {
  id: ObjectId;
  username: string;
  role: ROLES;
}

interface UserToken {
  id: ObjectId;
  role: ROLES;
  username: string;
  iat: string;
  exp: string;
}
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userToken: UserToken): Promise<boolean> {
    const user = await this.userService.findById(userToken.id);

    if (!user || user.username != userToken.username) return false;

    return true;
  }

  createToken(payload: AuthToken) {
    return this.jwtService.sign(payload, {
      expiresIn: '1d',
    });
  }

  async login(userLogin: LoginDto): Promise<any> {
    // find an user mathcing the username
    const userExist = await this.userService.findOnePassword(
      userLogin.username,
    );

    if (!userExist)
      throw new NotFoundException(`User #${userLogin.username} not found`);

    // checking password
    const isCorrectPassword = comparePassword(
      userLogin.password,
      userExist.credentials.local.password,
    );

    if (!isCorrectPassword) throw new NotFoundException(`Wrong password`);

    const user = await this.userService.findById(userExist._id);

    const token = this.createToken({
      id: user._id,
      username: user.username,
      role: user.role,
    });

    return { token: token, user: user };
  }

  async register(userDto: UserDto): Promise<any> {
    const user = await this.userService.create(userDto);

    const token = this.createToken({
      id: user._id,
      username: user.username,
      role: user.role,
    });

    return { token: token, user: user };
  }

  async checkUniqueField(userDto: UserDto): Promise<any> {
    let userExist = await this.userService.findOneUsername(userDto.username);

    // if username is already taken
    if (userExist)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Email already exist',
        },
        HttpStatus.FORBIDDEN,
      );

    userExist = await this.userService.findOneLocalEmail(
      userDto.credentials.local.email,
    );
    // if email is already taken
    if (userExist)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Email already exist',
        },
        HttpStatus.FORBIDDEN,
      );
  }
}
