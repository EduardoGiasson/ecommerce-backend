// formula.service.ts

import {
  Injectable,
} from '@nestjs/common';

import {
  InjectRepository,
} from '@nestjs/typeorm';

import {
  DeepPartial,
  Repository,
} from 'typeorm';

import { Formula } from './formula.entity';

@Injectable()
export class FormulaService {

  constructor(

    @InjectRepository(Formula)

    private repository:
      Repository<Formula>,
  ) {}

  /* ================= LIST ================= */

  findAll():
    Promise<Formula[]> {

    return this.repository.find();
  }

  /* ================= FIND BY ID ================= */

  findById(
    id: string,
  ): Promise<Formula | null> {

    return this.repository.findOne({
      where: { id },
    });
  }

  /* ================= CREATE ================= */

  async create(
    data: DeepPartial<Formula>,
  ): Promise<Formula> {

    const creditos =

      data.possui_painel_solar

        ? (data.energia_kwh || 0) *
          (data.fator_credito || 0)

        : 0;

    const valorTotal =

      (data.energia_kwh || 0) *
      (data.valor_kwh || 0);

    const formula =
      this.repository.create({

        ...data,

        creditos_gerados:
          creditos,

        valor_total:
          valorTotal,
      });

    return this.repository.save(
      formula,
    );
  }

  /* ================= UPDATE ================= */

  async update(
    id: string,
    data: DeepPartial<Formula>,
  ): Promise<Formula> {

    const formula =
      await this.findById(id);

    if (!formula) {
      throw new Error(
        'Formula não encontrada',
      );
    }

    const energia =
      data.energia_kwh ??
      formula.energia_kwh;

    const fator =
      data.fator_credito ??
      formula.fator_credito;

    const valorKwh =
      data.valor_kwh ??
      formula.valor_kwh;

    const painelSolar =
      data.possui_painel_solar ??
      formula.possui_painel_solar;

    const creditos =
      painelSolar
        ? energia * fator
        : 0;

    const valorTotal =
      energia * valorKwh;

    await this.repository.update(
      id,
      {

        ...data,

        creditos_gerados:
          creditos,

        valor_total:
          valorTotal,
      },
    );

    const updated =
      await this.findById(id);

    if (!updated) {
      throw new Error(
        'Formula não encontrada',
      );
    }

    return updated;
  }

  /* ================= DELETE ================= */

  async remove(
    id: string,
  ): Promise<void> {

    await this.repository.delete(id);
  }
}