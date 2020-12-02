import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDTO } from './producto.dto';
import { Producto } from './producto.entity';

@Injectable()
export class ProductoService {
  
    constructor(
        @InjectRepository(Producto)
        private readonly productoRepository: Repository<Producto>
        ) {}

        public async getAllRaw(): Promise<Producto[]>{
            console.log("getAll de productos")
            const result = await this.productoRepository.find()
            // const result = await this.productoRepository.query("select * from e01_producto");
            // // console.log("resultado: " + result);
            // let productos: Producto[] = [];
            // result.forEach(element => {
            // let p: Producto= new Producto( element['marca'],
            //                                 element['nombre'],
            //                                 element['descripcion'],
            //                                 element['precio'],
            //                                 element['stock']);

            // p.setCodigoProducto(element['codigo_producto']);
            // productos.push(p);
            // });
            // return productos;
            return result;
        } 
        // AGREGAR TRY/CATCH!

        public async getById(id: number): Promise<Producto> {
            const prod: Producto = await this.productoRepository.findOne(id);
            return prod;
        }

        public async addProduct(newProduct: ProductDTO): Promise<Producto> {
            const productoNuevo: Producto = await this.productoRepository.save( new Producto (
                newProduct.marca,
                newProduct.nombre,
                newProduct.descripcion,
                newProduct.precio,
                newProduct.stock)
            );
            return productoNuevo;
        }

        public async actualizarProduct( newProductData: ProductDTO, id: number): Promise<Producto>{
            const producto: Producto = await this.productoRepository.findOne(id);
        if (!producto) {
            throw new HttpException('Client does not exist!', 404);
        }
        producto.setMarca(newProductData.marca);
        producto.setNombre(newProductData.nombre);
        producto.setDescripcion(newProductData.descripcion);
        producto.setPrecio(newProductData.precio);
        producto.setStock(newProductData.stock);

        return producto;
        }
    
       public async deleteProduct(id: number){
        try {
            let producto: Producto = await this.productoRepository.findOne(id);
                if (producto.getCodigoProducto()) {
                    let deleted = await this.productoRepository.delete(id);
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
