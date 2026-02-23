import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EletroPostoController } from './eletroposto.controller';
import { EletroPostoService } from './eletroposto.service';
import { EletroPosto } from './eletroposto.entity';
import { Customer } from '../customer/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EletroPosto, Customer])],
  providers: [EletroPostoService],
  controllers: [EletroPostoController],
})
export class EletroPostoModule {}
