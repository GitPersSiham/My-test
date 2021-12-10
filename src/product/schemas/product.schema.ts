import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  name: String,
  category: String,
  sku: String,
  price: Number,
  quantity: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
