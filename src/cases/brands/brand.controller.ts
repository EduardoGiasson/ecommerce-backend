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
import { Brand } from './brand.entity';
import { BrandService } from './brand.service';

@Controller('brand')
export class BrandController {
  constructor(private readonly service: BrandService) {}

  @Get()
  findAll(): Promise<Brand[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Brand> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }

    return found;
  }

  @Post()
  create(@Body() category: Brand): Promise<Brand> {
    return this.service.save(category);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() category: Brand,
  ): Promise<Brand> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }
    category.id = id;

    return this.service.save(category);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }

    return this.service.remove(id);
  }
}
