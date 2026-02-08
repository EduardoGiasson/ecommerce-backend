import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { CategoryService } from '../categories/category.service';
import { validate as isUUID } from 'uuid';
import { CarService } from './car.service';
import { Car } from './car.entity';

@Controller('cars')
export class CarController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly service: CarService,
  ) {}

  @Get()
  async find(@Query('categoryId') categoryId: string): Promise<Car[]> {
    if (categoryId && isUUID(categoryId)) {
      const category = await this.categoryService.findById(categoryId);
      return this.service.findAll(category);
    }

    return this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Car> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }

    return found;
  }

  @Post()
  create(@Body() car: Car): Promise<Car> {
    return this.service.save(car);
  }

  @Put(':id')
async update(
  @Param('id', ParseUUIDPipe) id: string,
  @Body() car: Car,
): Promise<Car> {
  const found = await this.service.findById(id);

  if (!found) {
    throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
  }

  car.id = id;
  return this.service.save(car);
}


  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }

    await this.service.remove(id);
  }
}
