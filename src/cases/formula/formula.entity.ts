import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('formula')
export class Formula {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('float')
  energia_kwh!: number;

  @Column({
    default: false,
  })
  possui_painel_solar!: boolean;

  @Column('float')
  fator_credito!: number;

  @Column('float')
  creditos_gerados!: number;

  @Column('float')
  valor_kwh!: number;

  @Column('float')
  valor_total!: number;

  @Column({
    type: 'date',
  })
  data_carregamento!: string;
}