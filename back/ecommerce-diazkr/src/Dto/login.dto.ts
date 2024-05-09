import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class  LoginUserDto {


    /**
   * Esta es la propiedad name
   * @example "Juana@example.com"
   */
    @IsNotEmpty()
    @IsString()
    email: string;
/**
   * Esta es la propiedad name
   * @example "Juana1893*"
   */
    @IsNotEmpty()
    @IsString()
    password: string; 
}