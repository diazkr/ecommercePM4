import { ApiHideProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Length, Matches} from "class-validator"

export class UserDto {

    /**
   * Esta es la propiedad name
   * @example "Juana Rojas"
   */
    @IsNotEmpty()
    @IsString()
    @Length(3,80)
    name: string;

    /**
   * Esta es la propiedad email
   * @example "Juana@example.com"
   */
    @IsNotEmpty()
    @IsEmail()
    email: string;

    /**
   * Esta es la propiedad contraseña
   * @example "Juana1893*"
   */
    @IsNotEmpty()
    @Length(8,15)
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,15}$/, {
        message:
          'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*, y tener una longitud entre 8 y 15 caracteres.',
      })
    password: string; 

    /**
   * Esta es la propiedad confirmar password
   * @example "Juana1893*"
   */
    @IsNotEmpty()
    @IsString()
    confirmPassword: string;

    @ApiHideProperty()
    @IsEmpty()
    rol?: string;

    /**
   * Esta es la propiedad dirección
   * @example "Cra 27 #54-23"
   */
    @IsNotEmpty()
    @IsString()
    @Length(3,80)
    address: string;

    /**
   * Esta es la propiedad telefono
   * @example "12338202"
   */
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    /**
   * Esta es la propiedad país
   * @example "Colombia"
   */
    @IsNotEmpty()
    @IsString()
    @Length(5,20)
    country: string;

    /**
   * Esta es la propiedad ciudad
   * @example "Bogota"
   */
    @IsNotEmpty()
    @IsString()
    @Length(5,20)
    city: string;
}