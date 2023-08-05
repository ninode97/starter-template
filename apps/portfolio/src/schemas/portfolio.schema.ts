import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@starter-template/backend-libs';

@Schema({ versionKey: false })
export class Portfolio extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  phoneNumber: string;
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
