export class CreateProductDTO {
  readonly name: string;
  readonly category: string;
  readonly sku: string;
  readonly price: number;
  readonly quantity: number;
  readonly createdAt: Date;
  readonly UpdatedAt: Date;
}
