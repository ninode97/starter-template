import { Injectable, Logger } from '@nestjs/common';

import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Portfolio } from './schemas/portfolio.schema';
import { AbstractRepository } from '@starter-template/backend-libs';

@Injectable()
export class PortfolioRepository extends AbstractRepository<Portfolio> {
  protected readonly logger = new Logger(PortfolioRepository.name);

  constructor(
    @InjectModel(Portfolio.name) portfolioModel: Model<Portfolio>,
    @InjectConnection() connection: Connection
  ) {
    super(portfolioModel, connection);
  }
}
