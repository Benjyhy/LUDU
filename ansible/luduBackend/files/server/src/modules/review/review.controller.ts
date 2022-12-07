import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from './dto/review.dto';
import { ApiTags } from '@nestjs/swagger';
import { GameService } from '../game/game.service';
import { UserService } from '../user/user.service';
import { StoreService } from '../store/store.service';

@Controller('review')
@ApiTags('Review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly gameService: GameService,
    private readonly userService: UserService,
    private readonly storeService: StoreService,
  ) {}

  @Post()
  async create(@Body() reviewDto: ReviewDto) {
    const existingUser = await this.userService.findById(reviewDto.user);
    if (!existingUser)
      throw new NotFoundException(`User #${reviewDto.user} not found`);

    // Either it's a Game or Store review
    if (reviewDto.store) {
      // For Store
      const existingStore = await this.storeService.findById(reviewDto.store);
      if (!existingStore)
        throw new NotFoundException(`Store #${reviewDto.store} not found`);

      // Check if user has already an review for this Store
      const reviewAlreadyExist = await this.reviewService.findIfAlreadyExist(
        reviewDto,
      );
      if (reviewAlreadyExist.length !== 0)
        throw new NotFoundException(
          `A review already exist with this store from this user #${reviewDto.user}`,
        );

      // Create Review for retrieve its Id
      const newReview = await this.reviewService.create(reviewDto);

      // Merge old reviews with the new one
      const mergedReview = [...existingStore.reviews, newReview._id.toString()];
      await this.storeService.updateReviews(reviewDto.store, mergedReview);
      return newReview;
    } else {
      // For Game
      const existingGame = await this.gameService.findById(reviewDto.game);
      if (!existingGame)
        throw new NotFoundException(`Game #${reviewDto.game} not found`);

      // Check if user has already an review for this Game
      const reviewAlreadyExist = await this.reviewService.findIfAlreadyExist(
        reviewDto,
      );
      if (reviewAlreadyExist.length !== 0)
        throw new NotFoundException(
          `A review already exist with this game from this user #${reviewDto.user}`,
        );

      const newReview = await this.reviewService.create(reviewDto);

      const mergedReview = [...existingUser.reviews, newReview._id.toString()];

      await this.userService.updateReviews(reviewDto.user, mergedReview);
      return newReview;
    }
  }

  @Get()
  async findAll() {
    return await this.reviewService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const review = await this.reviewService.findOne(id);
    if (!review) throw new NotFoundException(`Review #${id} not found`);
    return review;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() reviewDto: ReviewDto) {
    return await this.reviewService.update(id, reviewDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const existingReview = await this.reviewService.findOne(id);

    if (!existingReview) throw new NotFoundException(`Store #${id} not found`);

    if (existingReview.store) {
      const store = await this.storeService.findById(existingReview.store);

      const newReviews = store.reviews.filter((item) => {
        return item.toString() !== id;
      });
      await this.storeService.updateReviews(
        existingReview.store.toString(),
        newReviews,
      );
      return this.reviewService.remove(id);
    } else {
      const game = await this.gameService.findById(
        existingReview.game.toString(),
      );
      const newReviews = game.reviews.filter((item) => {
        return item.toString() !== id;
      });
      await this.storeService.updateReviews(
        existingReview.game.toString(),
        newReviews,
      );
      return this.reviewService.remove(id);
    }
  }
}
