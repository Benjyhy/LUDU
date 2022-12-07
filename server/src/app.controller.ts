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

  // @Get('/user/:filename')
  // async serveUserImages(
  //   @Param('filename') filename: string,
  // ): Promise<StreamableFile> {
  //   console.log(join(process.cwd(), appConfig().game.staticFolder));
  //   const fileExist = checkIfFileOrDirectoryExists(
  //     join(process.cwd(), appConfig().user.staticFolder, `${filename}.webp`),
  //   );
  //   if (!fileExist)
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.NOT_FOUND,
  //         error: `${filename} not found`,
  //       },
  //       HttpStatus.NOT_FOUND,
  //     );
  //   const file = createReadStream(
  //     join(
  //       process.cwd(),
  //       appConfig().user.staticFolder,
  //       `/user/avatar/${filename}.webp`,
  //     ),
  //   );
  //   return new StreamableFile(file);
  // }

  // @Get('/user/:filename')
  // async serveGameImages(
  //   @Param('filename') filename: string,
  // ): Promise<StreamableFile> {
  //   console.log(join(process.cwd(), appConfig().game.staticFolder));
  //   const fileExist = checkIfFileOrDirectoryExists(
  //     join(
  //       process.cwd(),
  //       appConfig().game.staticFolder,
  //       `/game/thumbnail/${filename}.webp`,
  //     ),
  //   );
  //   if (!fileExist)
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.NOT_FOUND,
  //         error: `${filename} not found`,
  //       },
  //       HttpStatus.NOT_FOUND,
  //     );
  //   const file = createReadStream(
  //     join(
  //       process.cwd(),
  //       appConfig().game.staticFolder,
  //       `/game/thumbnail/${filename}.webp`,
  //     ),
  //   );
  //   return new StreamableFile(file);
  // }
}
