import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { Favorite } from './favorite.entity';
import { FavoriteService } from './favorite.service';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly service: FavoriteService) {}

  @Get()
  findByCustomer(@Query('customerId') customerId: string) {
    return this.service.findByCustomer(customerId);
  }

  @Post()
  toggle(@Body() favorite: Favorite) {
    return this.service.toggle(favorite);
  }
}
