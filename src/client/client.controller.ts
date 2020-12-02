import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { ClientDTO } from './client.dto';
import { Client } from './client.entity';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
    public constructor ( private readonly clientService: ClientService) {}

    @Get("get-all")
    public getAllClients(): Promise<Client[]> {
        return this.clientService.getAll();
    }

    @Get(":id")
    public getClientById(@Param('id') id: number): Promise<Client> {
        return this.clientService.getById(id);
    }

    @Post("add-client")
    public createClient(@Body() clientDTO: ClientDTO) : Promise<Client> {
        return this.clientService.addClient(clientDTO);
    }

    @Put(":id")
    public modifyClient(@Body() newClientData: ClientDTO, @Param('id') id:number): Promise<Client> {
        return this.clientService.updateClient(newClientData, id);
    }

    @Delete(':id')
    public deleteClient(@Param('id') id:number) {
        return this.clientService.deleteCliente(id);
    }
}
