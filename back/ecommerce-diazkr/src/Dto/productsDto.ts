
import { IsNotEmpty, IsNumber, IsString, Length, Matches} from "class-validator"

export class ProductDto {


    /**
   * Esta es la propiedad name
   * @example "Camiseta Playera"
   */
    @IsNotEmpty()
    @IsString()
    @Length(3,80)
    name: string;

        /**
   * Esta es la propiedad descripcion
   * @example "Camiseta de color naranja con botones"
   */
    @IsNotEmpty()
    @IsString()
    description: string;

    /**
   * Esta es la propiedad precio
   * @example 15.43
   */
    @IsNotEmpty()
    @IsNumber()
    price: number;

    /**
   * Esta es la propiedad stock
   * @example 24
   */
    @IsNotEmpty()
    stock: number;
    /**
     * Esta es la propiedad link de imagen
     * @example "https://ejemplo.com/imagen2.jpg"
     */
    @IsNotEmpty()
    @IsString()
    imgUrl: string;

    /**
   * Esta es la propiedad categoria
   * @example "Vestidos"
   */
    @IsNotEmpty()
    @IsString()
    category: string;



}