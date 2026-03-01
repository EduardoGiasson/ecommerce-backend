import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Agendamento } from './agendamento.entity';
import { AgendamentoController } from './agendamento.controller';
import { AgendamentoService } from './agendamento.service';
import { Customer } from '../customer/customer.entity';
import { EletroPosto } from '../eletropostos/eletroposto.entity';
import { Car } from '../cars/car.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Agendamento,
      Customer,
      EletroPosto,
      Car,
    ]),
  ],
  controllers: [AgendamentoController],
  providers: [AgendamentoService],
  exports: [AgendamentoService],
})
export class AgendamentoModule {}