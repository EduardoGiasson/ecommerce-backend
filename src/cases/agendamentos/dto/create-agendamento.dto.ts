import {
  IsUUID,
  IsDateString,
  IsEnum,
  IsString,
} from 'class-validator';

import { AgendamentoStatus } from '../agendamento.entity';

export class CreateAgendamentoDto {
  @IsUUID()
  eletropostoId: string;

  @IsUUID()
  carId: string;

  @IsDateString()
  data: string;

  @IsString()
  horaInicio: string;

  @IsString()
  horaFim: string;

  @IsEnum(AgendamentoStatus)
  status: AgendamentoStatus;
}