import { HttpStatus, Response } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDTO } from './dto/product.dto';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;
  const responseMock = {
    status: HttpStatus.OK,
  };

  const createProductDTOMock = {
    CreateProductDTO,
  } as unknown as CreateProductDTO;

  const mockProductsService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    })
      .overrideProvider(ProductService)
      .useValue(mockProductsService)
      .compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should have a create method', () => {
    expect(typeof controller.createPost).toBe('function');
  });
  describe('createPost', () => {
    it('it shoold return 200', () => {
      controller.createPost(responseMock, createProductDTOMock);
      expect(responseMock.status).not.toBe(400);
    });
  });
});
