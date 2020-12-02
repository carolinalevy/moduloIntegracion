import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientDTO } from './client.dto';
import { Client } from './client.entity';

@Injectable()
export class ClientService {

    constructor (
        @InjectRepository(Client)
        private readonly clientRepository: Repository <Client>
    ) {}

    public async getAll(): Promise <Client[]>{
        const result = await this.clientRepository.find(); // FORMA CORRECTA
        // let cliente: Client[] =[];
        // result.forEach(element => {
        //     let c: Client = new Client (element['nombre'],
        //                                 element['apellido'],
        //                                 element['direccion'],
        //                                 element['activo']);
        //     c.setNroCliente(element['nro_cliente']);
        //     cliente.push(c);
        // });
        return result;
    }

    public async getById(id: number): Promise<Client> {
        const client: Client = await this.clientRepository.findOne(id);
        return client;
    }

    public async addClient(newClient: ClientDTO): Promise<Client> {
        const clienteNuevo: Client = await  this.clientRepository.save( new Client (
            newClient.nombre,
            newClient.apellido,
            newClient.direccion,
            newClient.activo)
        );
        return clienteNuevo;
    }

    public async  updateClient(newClientData: ClientDTO, id: number): Promise<Client> {
        const cliente: Client = await this.clientRepository.findOne(id);
        if (!cliente) {
            throw new HttpException('Client does not exist!', 404);
        }
        cliente.setNombre(newClientData.nombre);
        cliente.setApellido(newClientData.apellido);
        cliente.setDireccion(newClientData.direccion);
        cliente.setActivo(newClientData.activo);
        
        return cliente;
    }

    public async deleteCliente(id: number) {
        try {
        let cliente: Client = await this.clientRepository.findOne(id);
            if (cliente.getNroCliente()) {
                let deleted = await this.clientRepository.delete(id);
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
