import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { GameService } from '../game/game.service';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly gameService: GameService,
  ) {}

  @Post()
  async create(@Body() createCategoryDto: CategoryDto) {
    const createCategory = await this.categoryService.create(createCategoryDto);

    createCategory.games.map(async (item) => {
      console.log(item);
    });
    return;
    // return this.categoryService.create(createCategoryDto);
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
  update(@Param('id') id: string, @Body() updateCategoryDto: CategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
