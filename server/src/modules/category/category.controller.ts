import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { GameService } from '../game/game.service';
import { GameDocument } from 'src/schemas/game.schema';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly gameService: GameService,
  ) {}

  @Post()
  async create(@Body() CategoryDto: CategoryDto) {
    const categoryExist = await this.categoryService.categoryAlreadyExist(
      CategoryDto.name,
    );
    if (categoryExist)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Category with the same NAME code already exist',
        },
        HttpStatus.FORBIDDEN,
      );

    return await this.categoryService.create(CategoryDto);

    // Promise.all(
    //   createCategory.games.map(async (item) => {
    //     // check if each games exist
    //     const existingGame = await this.gameService.findById(item.toString());

    //     if (!existingGame)
    //       throw new NotFoundException(`Game #${item.toString()} not found`);

    //     // merge old categories with the new one
    //     const newCategories = [
    //       ...existingGame.categories,
    //       createCategory._id.toString(),
    //     ];

    //     // update games' categories array
    //     return await this.gameService.updateCategories(
    //       existingGame._id.toString(),
    //       newCategories,
    //     );
    //   }),
    // );
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: CategoryDto,
  ) {
    const categoryExist = await this.categoryService.findById(id);
    if (!categoryExist)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Category not found',
        },
        HttpStatus.FORBIDDEN,
      );
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const categoryExist = await this.categoryService.findById(id);
    if (!categoryExist)
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Category does not exist',
        },
        HttpStatus.FORBIDDEN,
      );

    const games = await this.gameService.findByCategory(
      categoryExist._id.toString(),
    );
    games.map(async (item: GameDocument) => {
      const newCategories = item.categories.filter(
        (e) => e._id.toString() !== categoryExist._id.toString(),
      );
      return await this.gameService.updateCategories(
        item._id.toString(),
        newCategories,
      );
    });
    return this.categoryService.remove(id);
  }
}
