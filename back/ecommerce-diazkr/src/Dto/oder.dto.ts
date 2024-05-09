import { IsArray, IsNotEmpty, IsUUID } from "class-validator";

export class orderdDto{
    /**
   * Esta es la propiedad id del usuario
   * @example "b6654c99-befd-4bfd-b68d-5dfe55a3908c"
   */
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    /**
   * Esta es la propiedad productos
   * @example [
        {
            "id": "f2406ba5-41dd-4050-bc0d-f6a30792b756"
        },
        {
            "id": "d72b0c66-b693-4aef-962d-0bc7ec8eed69"
        }
    ]
   */
    @IsArray()
    @IsNotEmpty()
    products: productOrderDto[]
    
}

export class productOrderDto{
    /**
   * Esta es la propiedad categoria
   * @example "Vestidos"
   */
    @IsNotEmpty()
    @IsUUID()
    id: string;
    
}

