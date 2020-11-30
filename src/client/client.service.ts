import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientService {
    constructor (
        @InjectRepository(Client)
        private readonly clientRepository: Repository <Client>
    ) {}

    public async getAll(): Promise <Client[]>{
        const result = await this.clientRepository.query("select * from e01_cliente");
        let cliente: Client[] =[];
        result.forEach(element => {
            let c: Client = new Client (element['nombre'],
                                        element['apellido'],
                                        element['direccion'],
                                        element['activo']);
            c.setNroCliente(element['nro_cliente']);
            cliente.push(c);
        });
        return cliente;
    }
}
