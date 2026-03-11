import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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

  // LISTAR TODOS
  findAll(): Promise<EletroPosto[]> {
    return this.repository.find({ relations: ['customer'] });
  }

  // BUSCAR POR ID
  async findById(id: string): Promise<EletroPosto> {
    const eletroposto = await this.repository.findOne({
      where: { id },
      relations: ['customer'],
    });

    if (!eletroposto) throw new NotFoundException('EletroPosto não encontrado');

    return eletroposto;
  }

  // CREATE
  async create(data: any): Promise<EletroPosto> {
    if (!data.customerId)
      throw new BadRequestException('customerId é obrigatório');

    const customer = await this.customerRepository.findOne({
      where: { id: data.customerId },
    });
    if (!customer) throw new NotFoundException('Customer não encontrado');

    const eletroposto = this.repository.create({
      name: data.name,
      cidade: data.cidade,
      bairro: data.bairro,
      rua: data.rua,
      numero: data.numero,
      cep: data.cep,
      potencia: data.potencia,
      imageUrl: data.imageUrl,
      customer,
    });

    return this.repository.save(eletroposto);
  }

  // UPDATE
  async update(id: string, data: any): Promise<EletroPosto> {
    const eletroposto = await this.findById(id);

    if (data.customerId) {
      const customer = await this.customerRepository.findOne({
        where: { id: data.customerId },
      });
      if (!customer) throw new NotFoundException('Customer não encontrado');
      eletroposto.customer = customer;
    }

    if (data.name !== undefined) eletroposto.name = data.name;
    if (data.cidade !== undefined) eletroposto.cidade = data.cidade;
    if (data.bairro !== undefined) eletroposto.bairro = data.bairro;
    if (data.rua !== undefined) eletroposto.rua = data.rua;
    if (data.numero !== undefined) eletroposto.numero = data.numero;
    if (data.cep !== undefined) eletroposto.cep = data.cep;
    if (data.potencia !== undefined) eletroposto.potencia = data.potencia;
    if (data.imageUrl !== undefined) eletroposto.imageUrl = data.imageUrl;

    return this.repository.save(eletroposto);
  }

  // DELETE
  async remove(id: string): Promise<void> {
    await this.findById(id);
    await this.repository.delete(id);
  }

  // FILTRAR POR CLIENTE
  async findByCustomer(customerId: string): Promise<EletroPosto[]> {
    return this.repository.find({
      where: { customer: { id: customerId } },
      relations: ['customer'],
    });
  }
}
