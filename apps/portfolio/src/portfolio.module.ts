import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';

import { PORTFOLIO_SERVICE } from './constants/services';
import { Portfolio, PortfolioSchema } from './schemas/portfolio.schema';
import {
  DatabaseModule,
  RmqModule,
  AuthModule,
} from '@starter-template/backend-libs';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { PortfolioRepository } from './portfolio.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/portfolio/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Portfolio.name, schema: PortfolioSchema },
    ]),
    RmqModule.register({
      name: PORTFOLIO_SERVICE,
    }),
    AuthModule,
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService, PortfolioRepository],
})
export class PortfolioModule {}
