// formula.module.ts

import {
  Module,
} from '@nestjs/common';

import {
  TypeOrmModule,
} from '@nestjs/typeorm';

import { Formula }
  from './formula.entity';

import { FormulaService }
  from './formula.service';

import { FormulaController }
  from './formula.controller';

@Module({

  imports: [
    TypeOrmModule.forFeature([
      Formula,
    ]),
  ],

  providers: [
    FormulaService,
  ],

  controllers: [
    FormulaController,
  ],
})

export class FormulaModule {}