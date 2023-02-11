import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, ObjectId } from 'mongoose';
import appConfig from '../../config/app.config';
import { deleteImage, saveImage } from '../../helpers/Utils';
import { Review } from '../../schemas/review.schema';
import { UserDocument } from '../../schemas/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDocument>,
  ) {}

  public async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find();
  }

  public async findById(id: ObjectId | string): Promise<UserDocument> {
    return await this.userModel.findById(id);
  }

  public async findOne(field: any): Promise<UserDocument> {
    return await this.userModel.findOne(field).exec();
  }

  public async findOnePassword(username: string): Promise<UserDocument> {
    return await this.userModel
      .findOne({ username: username })
      .select('credentials.local.password');
  }

  public async findOneUsername(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username: username });
  }

  public async findOneLocalEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ 'credentials.local.email': email });
  }

  public async findOneOauthEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ 'credentials.oauth.email': email });
  }

  async create(UserDto: UserDto): Promise<UserDocument> {
    return this.userModel.create(UserDto);
  }

  public async update(
    id: string,
    updateUserDto: UserDto,
  ): Promise<UserDocument> {
    const existingUser = await this.userModel.findById(id);

    if (!existingUser) throw new NotFoundException(`User #${id} not found`);

    // checking if avatar has been changed
    if (existingUser.avatar === updateUserDto.avatar) {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        { _id: id },
        updateUserDto,
      );
      return updatedUser;
    }

    const isImageDeleted = await deleteImage(
      existingUser.avatar,
      `${appConfig().user.staticFolder}/avatar/`,
    );

    // If false, delete has not occur
    if (!isImageDeleted)
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: "An error occur when the old  user'avatar has been deleted",
        },
        HttpStatus.FORBIDDEN,
      );

    updateUserDto.avatar = await saveImage(
      updateUserDto.avatar,
      `${appConfig().user.staticFolder}/avatar/`,
    );

    return await this.userModel.findById(id);
  }

  public async updateReviews(
    id: string,
    reviewId: (string | Review)[],
  ): Promise<UserDocument> {
    const updatedUser = await this.userModel.updateOne(
      { _id: id },
      { $set: { reviews: reviewId } },
    );

    if (!updatedUser) throw new NotFoundException(`User #${id} not found`);

    return await this.userModel.findById(id);
  }

  public async remove(id: string): Promise<any> {
    const isUser = await this.userModel.findByIdAndRemove(id);

    if (!isUser) throw new NotFoundException(`User #${id} not found`);

    return isUser;
  }
}
