import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PortfolioRepository } from './portfolio.repository';
import { PORTFOLIO_SERVICE } from './constants/services';
import { CreatePortfolioRequest } from './dto/create-order.request';

@Injectable()
export class PortfolioService {
  constructor(
    private readonly ordersRepository: PortfolioRepository,
    @Inject(PORTFOLIO_SERVICE) private portfolioClient: ClientProxy
  ) {}

  async createOrder(request: CreatePortfolioRequest, authentication: string) {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(request, { session });
      await lastValueFrom(
        this.portfolioClient.emit('portfolio_created', {
          request,
          Authentication: authentication,
        })
      );
      await session.commitTransaction();
      return order;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async getOrders() {
    return this.ordersRepository.find({});
  }
}
