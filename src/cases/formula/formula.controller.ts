// formula.controller.ts

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

import { FormulaService }
  from './formula.service';

import { Formula }
  from './formula.entity';

@Controller('formula')
export class FormulaController {

  constructor(
    private readonly service:
      FormulaService,
  ) {}

  /* ================= LIST ================= */

  @Get()
  find():
    Promise<Formula[]> {

    return this.service.findAll();
  }

  /* ================= FIND BY ID ================= */

  @Get(':id')

  async findById(

    @Param(
      'id',
      ParseUUIDPipe,
    )

    id: string,

  ): Promise<Formula> {

    const found =
      await this.service
        .findById(id);

    if (!found) {

      throw new HttpException(

        'Formula not found',

        HttpStatus.NOT_FOUND,
      );
    }

    return found;
  }

  /* ================= CREATE ================= */

  @Post()

  create(

    @Body()

    formula:
      Omit<
        Formula,
        'id'
      >,

  ): Promise<Formula> {

    return this.service
      .create(formula);
  }

  /* ================= UPDATE ================= */

  @Put(':id')

  async update(

    @Param(
      'id',
      ParseUUIDPipe,
    )

    id: string,

    @Body()

    formula:
      Partial<Formula>,

  ): Promise<Formula> {

    const found =
      await this.service
        .findById(id);

    if (!found) {

      throw new HttpException(

        'Formula not found',

        HttpStatus.NOT_FOUND,
      );
    }

    return this.service.update(
      id,
      formula,
    );
  }

  /* ================= DELETE ================= */

  @Delete(':id')

  @HttpCode(
    HttpStatus.NO_CONTENT,
  )

  async remove(

    @Param(
      'id',
      ParseUUIDPipe,
    )

    id: string,

  ): Promise<void> {

    const found =
      await this.service
        .findById(id);

    if (!found) {

      throw new HttpException(

        'Formula not found',

        HttpStatus.NOT_FOUND,
      );
    }

    await this.service.remove(id);
  }
}