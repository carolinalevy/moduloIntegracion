import { Controller, Get } from '@nestjs/common';
import { Producto } from './producto.entity';
import { ProductoService } from './producto.service';

@Controller('producto')
export class ProductoController {

    public constructor ( private readonly productoService: ProductoService) {}

    @Get('get-all-raw')
    public getAllProductosRaw(): Promise <Producto[]> {
        return this.productoService.getAllRaw();
    }

}
