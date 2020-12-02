import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductDTO } from './producto.dto';
import { Producto } from './producto.entity';
import { ProductoService } from './producto.service';

@Controller('producto')
export class ProductoController {

    public constructor ( private readonly productoService: ProductoService) {}

    @Get('get-all-raw')
    public getAllProductosRaw(): Promise <Producto[]> {
        return this.productoService.getAllRaw();
    }

    @Get(":id")
    public getProductById(@Param("id") id:number): Promise <Producto> {
        return this.productoService.getById(id);
    }

    @Post("add-product")
    public createProduct(@Body() newProductData: ProductDTO): Promise<Producto>{
        return this.productoService.addProduct(newProductData);
    }

    @Put(":id")
    public updateProduct(@Body() newProductData: ProductDTO, @Param('id') id: number){
        return this.productoService.actualizarProduct(newProductData, id);
    }

    @Delete(":id")
    public deleteProduct (@Param("id") id: number){ 
        return this.productoService.deleteProduct(id);
    }

}
