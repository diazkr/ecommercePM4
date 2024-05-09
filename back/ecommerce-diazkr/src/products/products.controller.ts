import { Body, Controller,Delete,Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductDto } from "../Dto/productsDto";
import { AuthGuard } from "../auth/guards/auth.guard";
import { Roles } from "../decorators/roles.decorator";
import { Rol } from "../auth/roles.enum";
import { RolesGuard } from "../auth/guards/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('products')
@Controller('products')

export class ProductsController{
    constructor(private readonly productsService:ProductsService){}

    @Get()
    async getProducts(@Query('page') page: string, @Query('limit') limit: string){
        if(page && limit){

            return await this.productsService.getProducts(Number(page), Number(limit));
        }
        return await this.productsService.getProducts(1,30);
    }
    
    @Get('seeder')
    async seedProducts(){
        return await this.productsService.seedProducts()
    }

    @Get(':id')
    async getById(@Param('id', ParseUUIDPipe) id:string){
        return await this.productsService.getById(id)
    }

    @ApiBearerAuth()
    @Post('createProduct')
    @Roles(Rol.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async createProduct(@Body() product: ProductDto){
        return await this.productsService.createProduct(product)
    }

    @ApiBearerAuth()
    @Put(':id')
    @Roles(Rol.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() product: Partial<ProductDto>){
        return await this.productsService.updateProduct(id,product)
    }

    @ApiBearerAuth()
    @Delete(':id')
    @Roles(Rol.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async deleteProduct(@Param('id', ParseUUIDPipe) id:string){
        return await this.productsService.deleteProduct(id)
    }


}