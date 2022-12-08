import {
  Controller,
  Get,
  Param,
  StreamableFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { checkIfFileOrDirectoryExists } from './helpers/storage';
import { createReadStream } from 'fs';
import { join } from 'path';
import appConfig from './config/app.config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
