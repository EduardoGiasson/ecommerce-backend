import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { EletroPosto } from './eletroposto.entity';
import { Customer } from '../customer/customer.entity';

@Injectable()
export class EletroPostoService {
  constructor(
    @InjectRepository(EletroPosto)
    private repository: Repository<EletroPosto>,

    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  findAll(): Promise<EletroPosto[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<EletroPosto> {
    const eletroposto = await this.repository.findOne({ where: { id } });

    if (!eletroposto)
      throw new NotFoundException('EletroPosto não encontrado');

    return eletroposto;
  }

  // CREATE
  async create(data: any): Promise<EletroPosto> {
    if (!data.customerId)
      throw new BadRequestException('customerId é obrigatório');

    const customer = await this.customerRepository.findOne({
      where: { id: data.customerId },
    });

    if (!customer)
      throw new NotFoundException('Customer não encontrado');

    const eletroposto = this.repository.create(); // <- importante

    eletroposto.name = data.name;
    eletroposto.description = data.description;
    eletroposto.imageUrl = data.imageUrl;
    eletroposto.brand = data.brand;
    eletroposto.active = data.active ?? true;
    eletroposto.customer = customer;

    return this.repository.save(eletroposto);
  }

  // UPDATE
  async update(id: string, data: any): Promise<EletroPosto> {
    const eletroposto = await this.findById(id);

    if (data.customerId) {
      const customer = await this.customerRepository.findOne({
        where: { id: data.customerId },
      });

      if (!customer)
        throw new NotFoundException('Customer não encontrado');

      eletroposto.customer = customer;
    }

    if (data.name !== undefined) eletroposto.name = data.name;
    if (data.description !== undefined) eletroposto.description = data.description;
    if (data.imageUrl !== undefined) eletroposto.imageUrl = data.imageUrl;
    if (data.brand !== undefined) eletroposto.brand = data.brand;
    if (data.active !== undefined) eletroposto.active = data.active;

    return this.repository.save(eletroposto);
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);
    await this.repository.delete(id);
  }

  // FILTRAR POR CLIENTE
  async findByCustomer(customerId: string): Promise<EletroPosto[]> {
    return this.repository.find({
      where: { customer: { id: customerId } },
    });
  }
}
