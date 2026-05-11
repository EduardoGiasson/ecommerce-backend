import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { DeepPartial, Repository } from 'typeorm';
import { TransacaoCreditos } from './formula.entity';

@Injectable()
export class TransacaoCreditosService {
  constructor(
    @InjectRepository(TransacaoCreditos)
    private repository: Repository<TransacaoCreditos>,
  ) {}

  /* ================= LIST ================= */

  findAll(): Promise<TransacaoCreditos[]> {
    return this.repository.find({
      order: {
        criado_em: 'DESC',
      },
    });
  }

  /* ================= FIND BY ID ================= */

  findById(id: string): Promise<TransacaoCreditos | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  /* ================= CREATE ================= */

  async create(
    data: DeepPartial<TransacaoCreditos>,
  ): Promise<TransacaoCreditos> {
    const creditos = data.possui_painel_solar
      ? (data.energia_consumida_kwh || 0) * (data.fator_credito || 0)
      : 0;

    const valorTotal =
      (data.energia_consumida_kwh || 0) * (data.valor_kwh || 0);

    const transacao = this.repository.create({
      ...data,

      creditos_gerados: creditos,

      valor_total: valorTotal,
    });

    return this.repository.save(transacao);
  }

  /* ================= UPDATE ================= */

  async update(
    id: string,

    data: DeepPartial<TransacaoCreditos>,
  ): Promise<TransacaoCreditos> {
    const transacao = await this.findById(id);

    if (!transacao) {
      throw new Error('Transação não encontrada');
    }

    const energia =
      data.energia_consumida_kwh ?? transacao.energia_consumida_kwh;

    const fator = data.fator_credito ?? transacao.fator_credito;

    const valorKwh = data.valor_kwh ?? transacao.valor_kwh;

    const painelSolar =
      data.possui_painel_solar ?? transacao.possui_painel_solar;

    const creditos = painelSolar ? energia * fator : 0;

    const valorTotal = energia * valorKwh;

    await this.repository.update(id, {
      ...data,

      creditos_gerados: creditos,

      valor_total: valorTotal,
    });

    const updated = await this.findById(id);

    if (!updated) {
      throw new Error('Transação não encontrada');
    }

    return updated;
  }

  /* ================= DELETE ================= */

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
