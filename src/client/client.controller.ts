import { Controller, Get } from '@nestjs/common';
import { Client } from './client.entity';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
    public constructor ( private readonly clientService: ClientService) {}

    @Get("get-all")
    public getAllClients(): Promise<Client[]> {
        return this.clientService.getAll();
    }
}
