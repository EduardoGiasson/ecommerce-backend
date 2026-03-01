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

import { Agendamento } from './agendamento.entity';
import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';

@Controller('agendamentos')
export class AgendamentoController {
  constructor(private readonly service: AgendamentoService) {}

  // 🔎 Listar todos
  @Get()
  find(): Promise<Agendamento[]> {
    return this.service.findAll();
  }

  // 🔎 Buscar por ID
  @Get(':id')
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Agendamento> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException(
        'Agendamento não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return found;
  }

  @Post()
async create(
  @Body() dto: CreateAgendamentoDto,
): Promise<Agendamento> {
  return this.service.create(dto);
}

  // ✏ Atualizar agendamento
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() agendamento: Partial<Agendamento>,
  ): Promise<Agendamento> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException(
        'Agendamento não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.service.update(id, agendamento);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    const found = await this.service.findById(id);

    if (!found) {
      throw new HttpException(
        'Agendamento não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.service.remove(id);
  }
}