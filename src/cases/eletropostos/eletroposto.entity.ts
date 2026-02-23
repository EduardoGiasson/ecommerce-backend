import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customer } from '../customer/customer.entity';

@Entity('eletropostos')
export class EletroPosto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  brand: string;

 @ManyToOne(() => Customer, { eager: true, nullable: false })
 customer: Customer;

}
