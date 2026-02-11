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
} from '@nestjs/common';

import { CarService } from './car.service';
import { Car } from './car.entity';

@Controller('cars')
export class CarController {
  constructor(private readonly service: CarService) {}

  @Get()
  find(): Promise<Car[]> {
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

  // CREATE (NUNCA recebe id)
  @Post()
  create(@Body() car: Omit<Car, 'id'>): Promise<Car> {
    return this.service.create(car);
  }

  // UPDATE (id vem só pela URL)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() car: Partial<Car>,
  ): Promise<Car> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
    }

    return this.service.update(id, car);
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
