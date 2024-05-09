import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { LoginUserDto } from "../Dto/login.dto";
import { UserDto } from "../Dto/users.dto";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('auth')

@Controller("auth")


export class AuthController{
    constructor(private readonly authService: AuthService){}


    @Post('signIn')
    signIn(@Body() credential:LoginUserDto){
        const {email, password} = credential;
        return this.authService.signIn(email, password);
    }

    @Post('singUp')
    singUp(@Body() user:UserDto){
        return this.authService.singUp(user)
    }
    
}