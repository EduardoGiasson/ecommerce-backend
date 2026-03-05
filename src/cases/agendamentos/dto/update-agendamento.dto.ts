import { IsOptional, IsUUID, IsString } from 'class-validator';
import { AgendamentoStatus } from '../agendamento.entity';

export class UpdateAgendamentoDto {
  @IsOptional()
  @IsUUID()
  eletropostoId?: string;

  @IsOptional()
  @IsUUID()
  carId?: string;

  @IsOptional()
  @IsString()
  data?: string;

  @IsOptional()
  @IsString()
  horaInicio?: string;

  @IsOptional()
  @IsString()
  horaFim?: string;

  @IsOptional()
  status?: AgendamentoStatus;
}
