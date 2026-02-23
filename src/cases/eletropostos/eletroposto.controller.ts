import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { EletroPostoService } from './eletroposto.service';
import { EletroPosto } from './eletroposto.entity';

@Controller('eletropostos')
export class EletroPostoController {
  constructor(private readonly service: EletroPostoService) {}

  @Get()
  find(): Promise<EletroPosto[]> {
    return this.service.findAll();
  }

  @Get('customer/:customerId')
  findByCustomer(
    @Param('customerId', ParseUUIDPipe) customerId: string,
  ): Promise<EletroPosto[]> {
    return this.service.findByCustomer(customerId);
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<EletroPosto> {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() body: any): Promise<EletroPosto> {
    return this.service.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: any,
  ): Promise<EletroPosto> {
    return this.service.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.service.remove(id);
  }
}
