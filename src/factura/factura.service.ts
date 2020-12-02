import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FacturaDTO } from './factura.dto';
import { Factura } from './factura.entity';

@Injectable()
export class FacturaService {
    
    constructor (
        @InjectRepository(Factura)
        private readonly facturaRepository: Repository <Factura>
    ) {}

    public async getAll(): Promise <Factura[]>{
        const result = await this.facturaRepository.find();
        return result;
    }

    public async getById(id: number): Promise<Factura> {
        const factura: Factura = await this.facturaRepository.findOne(id);
        return factura;
    }

    public async addFactura(newFactura: FacturaDTO): Promise<Factura> {
        const facturaNueva: Factura = await  this.facturaRepository.save( new Factura (
            newFactura.fecha,
            newFactura.total_sin_iva,
            newFactura.iva,
            newFactura.total_con_iva,
            newFactura.nro_cliente)
        );
        return facturaNueva;
    }

    public async  updateFactura(newFacturaData: FacturaDTO, id: number): Promise<Factura> {
        const factura: Factura = await this.facturaRepository.findOne(id);
        if (!factura) {
            throw new HttpException('Client does not exist!', 404);
        }
        factura.setFecha(newFacturaData.fecha);
        factura.setTotalSinIva(newFacturaData.total_sin_iva);
        factura.setIva(newFacturaData.iva);
        factura.setTotalConIva(newFacturaData.total_con_iva);
        factura.setNroCliente(newFacturaData.nro_cliente);
        
        return factura;
    }

    public async deleteFactura(id: number) {
        try {
        let factura: Factura = await this.facturaRepository.findOne(id);
            if (factura.getNroFactura()) {
                let deleted = await this.facturaRepository.delete(id);
                return deleted;
            }
        }catch (error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "there is an error in the request, " + error,
              }, HttpStatus.NOT_FOUND);
        }
    }
}

