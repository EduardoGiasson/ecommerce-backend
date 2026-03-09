import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from '../customer/customer.entity';

@Entity('eletropostos')
export class EletroPosto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  endereco: string;

  @Column('float')
  potencia: number;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => Customer, { eager: true, nullable: false })
  customer: Customer;
}