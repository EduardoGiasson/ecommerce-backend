import { Repository, DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Category } from '../categories/category.entity';
import { Car } from './car.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private repository: Repository<Car>,
  ) {}

  findAll(category?: Category | null): Promise<Car[]> {
    if (!category) {
      return this.repository.find();
    }

    return this.repository.find({
      where: { category },
      relations: ['category', 'brand'],
    });
  }

  findById(id: string): Promise<Car | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['category', 'brand'],
    });
  }

  save(car: DeepPartial<Car>): Promise<Car> {
    return this.repository.save(car);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
