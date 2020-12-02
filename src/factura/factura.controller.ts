import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FacturaDTO } from './factura.dto';
import { Factura } from './factura.entity';
import { FacturaService } from './factura.service';

@Controller('factura')
export class FacturaController {
    public constructor ( private readonly facturaService: FacturaService) {}

    @Get("get-all")
    public getAllFacturas(): Promise<Factura[]> {
        return this.facturaService.getAll();
    }

    @Get(":id")
    public getFacturaById(@Param('id') id: number): Promise<Factura> {
        return this.facturaService.getById(id);
    }

    @Post("add-factura")
    public createFactura(@Body() facturaDTO: FacturaDTO) : Promise<Factura> {
        return this.facturaService.addFactura(facturaDTO);
    }

    @Put(":id")
    public modifyFactura(@Body() newFacturaData: FacturaDTO, @Param('id') id:number): Promise<Factura> {
        return this.facturaService.updateFactura(newFacturaData, id);
    }

    @Delete(':id')
    public deleteFactura(@Param('id') id:number) {
        return this.facturaService.deleteFactura(id);
    }
}
