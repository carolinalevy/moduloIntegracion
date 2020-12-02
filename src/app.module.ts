import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoModule } from './producto/producto.module';
import { ClientModule } from './client/client.module';
import { FacturaModule } from './factura/factura.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ProductoModule, ClientModule, FacturaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}