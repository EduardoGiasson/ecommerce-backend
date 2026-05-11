import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('transacoes_creditos')
export class TransacaoCreditos {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  carteira!: string;

  @Column('float')
  energia_consumida_kwh!: number;

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

  @Column()
  hash_transacao!: string;

  @CreateDateColumn()
  criado_em!: Date;
}
