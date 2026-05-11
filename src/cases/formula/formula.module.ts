import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TransacaoCreditosController } from './formula.controller';
import { TransacaoCreditosService } from './formula.service';
import { TransacaoCreditos } from './formula.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransacaoCreditos])],

  providers: [TransacaoCreditosService],

  controllers: [TransacaoCreditosController],
})
export class TransacaoCreditosModule {}
