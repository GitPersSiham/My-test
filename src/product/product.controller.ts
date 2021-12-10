import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Query,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';

import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
import { LocalAuthGuard } from '../auth/guard/local-auth.guard';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Produit crée avec succès',
      product,
    });
  }

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({
      products,
    });
  }

  @Get('/:productID')
  async getProduct(@Res() res, @Param('productID') productID) {
    const product = await this.productService.getProduct(productID);
    if (!product) throw new NotFoundException("produit n'existe pas");
    return res.status(HttpStatus.OK).json(product);
  }

  @Get('categories')
  async findCategories(@Res() res) {
    const products = await this.productService.findCategories();

    return res.status(HttpStatus.OK).json(products);
  }
  @UseGuards(LocalAuthGuard)
  @Delete('/delete')
  async deleteProdcut(@Res() res, @Query('productID') productID) {
    const productDeleted = await this.productService.deleteProduct(productID);
    if (!productDeleted) throw new NotFoundException("produit n'existe pas");
    return res.status(HttpStatus.OK).json({
      message: 'Produit supprimé avec succès',
      productDeleted,
    });
  }
  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateProduct(
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
    @Query('productID') productID,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      productID,
      createProductDTO,
    );
    if (!updatedProduct) throw new NotFoundException("produit n'existe pas");
    return res.status(HttpStatus.OK).json({
      message: 'produit à jour  ',
      updatedProduct,
    });
  }
}
