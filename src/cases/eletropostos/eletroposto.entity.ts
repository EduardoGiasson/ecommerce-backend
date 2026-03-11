import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from '../customer/customer.entity';

@Entity('eletropostos')
export class EletroPosto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  cidade: string;

  @Column({ nullable: true })
  bairro: string;

  @Column({ nullable: true })
  rua: string;

  @Column({ nullable: true })
  numero: string;

  @Column({ nullable: true })
  cep: string;

  @Column('float')
  potencia: number;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: true })
  active: boolean; // <-- adicionado

  @ManyToOne(() => Customer, { eager: true, nullable: false })
  customer: Customer;
}
