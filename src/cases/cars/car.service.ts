import { Repository, DeepPartial } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Car } from './car.entity';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private repository: Repository<Car>,
  ) {}

  // LISTAR
  findAll(): Promise<Car[]> {
    return this.repository.find();
  }

  // BUSCAR POR ID
  findById(id: string): Promise<Car | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  // CREATE
  async create(data: DeepPartial<Car>): Promise<Car> {
    const car = this.repository.create(data);
    return this.repository.save(car);
  }

  // UPDATE
  async update(id: string, data: DeepPartial<Car>): Promise<Car> {
    await this.repository.update(id, data);

    const updated = await this.findById(id);
    if (!updated) throw new Error('Carro não encontrado');

    return updated;
  }

  // DELETE
  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
