import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Agendamento } from './agendamento.entity';
import { Customer } from '../customer/customer.entity';
import { EletroPosto } from '../eletropostos/eletroposto.entity';
import { Car } from '../cars/car.entity';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';

@Injectable()
export class AgendamentoService {
  constructor(
    @InjectRepository(Agendamento)
    private agendamentoRepository: Repository<Agendamento>,

    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,

    @InjectRepository(EletroPosto)
    private eletropostoRepository: Repository<EletroPosto>,

    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  findAll(): Promise<Agendamento[]> {
    return this.agendamentoRepository.find({
      relations: ['customer', 'eletroposto', 'car'],
    });
  }

  findById(id: string): Promise<Agendamento | null> {
    return this.agendamentoRepository.findOne({
      where: { id },
      relations: ['customer', 'eletroposto', 'car'],
    });
  }

  async create(dto: CreateAgendamentoDto): Promise<Agendamento> {
    const eletroposto = await this.eletropostoRepository.findOne({
      where: { id: dto.eletropostoId },
    });

    if (!eletroposto) {
      throw new NotFoundException('Eletroposto não encontrado');
    }

    const car = await this.carRepository.findOne({
      where: { id: dto.carId },
    });

    if (!car) {
      throw new NotFoundException('Carro não encontrado');
    }

    // ⚠️ Aqui você precisa decidir como pegar o customer
    // Por enquanto vou buscar o primeiro apenas para não quebrar
    const customer = await this.customerRepository.findOne({
      where: {},
    });

    if (!customer) {
      throw new NotFoundException('Customer não encontrado');
    }

    const agendamento = this.agendamentoRepository.create({
      data: dto.data,
      horaInicio: dto.horaInicio,
      horaFim: dto.horaFim,
      status: dto.status,
      customer,
      eletroposto,
      car,
    });

    return this.agendamentoRepository.save(agendamento);
  }

  async update(
    id: string,
    data: Partial<Agendamento>,
  ): Promise<Agendamento> {
    await this.agendamentoRepository.update(id, data);

    const updated = await this.findById(id);
    if (!updated) throw new NotFoundException('Agendamento não encontrado');

    return updated;
  }

  async remove(id: string): Promise<void> {
    await this.agendamentoRepository.delete(id);
  }
}