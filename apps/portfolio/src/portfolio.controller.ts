import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreatePortfolioRequest } from './dto/create-order.request';
import { PortfolioService } from './portfolio.service';
import { JwtAuthGuard } from '@starter-template/backend-libs';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() request: CreatePortfolioRequest, @Req() req: any) {
    return this.portfolioService.createOrder(
      request,
      req.cookies?.Authentication
    );
  }

  @Get()
  async getOrders() {
    return this.portfolioService.getOrders();
  }
}
