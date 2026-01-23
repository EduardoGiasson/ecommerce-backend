import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../categories/category.module';
import { Car } from './car.entity';
import { CarService } from './car.service';
import { CarController } from './car.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Car]), CategoryModule],
  providers: [CarService],
  controllers: [CarController],
})
export class CarModule {}
