import { Document } from 'mongoose';

export interface Product extends Document {
  readonly name: string;
  readonly category: string;
  readonly sku: string;
  readonly price: number;
  readonly quantity: number;
  readonly createdAt: Date;
}
