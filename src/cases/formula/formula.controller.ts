import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TransacaoCreditosService } from './formula.service';
import { TransacaoCreditos } from './formula.entity';

@Controller('transacoes-creditos')
export class TransacaoCreditosController {
  constructor(private readonly service: TransacaoCreditosService) {}

  /* ================= LIST ================= */

  @Get()
  find(): Promise<TransacaoCreditos[]> {
    return this.service.findAll();
  }

  /* ================= FIND BY ID ================= */

  @Get(':id')
  async findById(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): Promise<TransacaoCreditos> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException(
        'Transação não encontrada',

        HttpStatus.NOT_FOUND,
      );
    }

    return found;
  }

  /* ================= CREATE ================= */

  @Post()
  create(
    @Body()
    transacao: Omit<TransacaoCreditos, 'id'>,
  ): Promise<TransacaoCreditos> {
    return this.service.create(transacao);
  }

  /* ================= UPDATE ================= */

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe)
    id: string,

    @Body()
    transacao: Partial<TransacaoCreditos>,
  ): Promise<TransacaoCreditos> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException(
        'Transação não encontrada',

        HttpStatus.NOT_FOUND,
      );
    }

    return this.service.update(id, transacao);
  }

  /* ================= DELETE ================= */

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): Promise<void> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException(
        'Transação não encontrada',

        HttpStatus.NOT_FOUND,
      );
    }

    await this.service.remove(id);
  }
}
