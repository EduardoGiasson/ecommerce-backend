import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Agendamento } from './agendamento.entity';
import { Customer } from '../customer/customer.entity';
import { EletroPosto } from '../eletropostos/eletroposto.entity';
import { Car } from '../cars/car.entity';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';

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

  async update(id: string, dto: UpdateAgendamentoDto): Promise<Agendamento> {
    const agendamento = await this.findById(id);

    if (!agendamento) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    if (dto.eletropostoId) {
      const eletroposto = await this.eletropostoRepository.findOne({
        where: { id: dto.eletropostoId },
      });

      if (!eletroposto) {
        throw new NotFoundException('Eletroposto não encontrado');
      }

      agendamento.eletroposto = eletroposto;
    }

    if (dto.carId) {
      const car = await this.carRepository.findOne({
        where: { id: dto.carId },
      });

      if (!car) {
        throw new NotFoundException('Carro não encontrado');
      }

      agendamento.car = car;
    }

    agendamento.data = dto.data ?? agendamento.data;
    agendamento.horaInicio = dto.horaInicio ?? agendamento.horaInicio;
    agendamento.horaFim = dto.horaFim ?? agendamento.horaFim;
    agendamento.status = dto.status ?? agendamento.status;

    return this.agendamentoRepository.save(agendamento);
  }

  async remove(id: string): Promise<void> {
    const agendamento = await this.findById(id);

    if (!agendamento) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    await this.agendamentoRepository.remove(agendamento);
  }
}
