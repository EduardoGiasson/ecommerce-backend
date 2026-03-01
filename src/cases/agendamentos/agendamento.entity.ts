import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { EletroPosto } from '../eletropostos/eletroposto.entity';
import { Car } from '../cars/car.entity';

export enum AgendamentoStatus {
  AGENDADO = 'agendado',
  CANCELADO = 'cancelado',
  CONCLUIDO = 'concluido',
}

@Entity('agendamentos')
export class Agendamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer, { nullable: false })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => EletroPosto, { nullable: false })
  @JoinColumn({ name: 'eletroposto_id' })
  eletroposto: EletroPosto;

  @ManyToOne(() => Car, { nullable: false })
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @Column({ type: 'date' })
  data: string;

  @Column({ type: 'time' })
  horaInicio: string;

  @Column({ type: 'time' })
  horaFim: string;

  // 📌 Status do agendamento
  @Column({
    type: 'enum',
    enum: AgendamentoStatus,
    default: AgendamentoStatus.AGENDADO,
  })
  status: AgendamentoStatus;

  // 🕒 Quando foi criado
  @CreateDateColumn()
  createdAt: Date;
}