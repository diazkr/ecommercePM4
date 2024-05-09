import { Controller,Get, Post, Put, Param, Body, Delete, Query, UseGuards, ParseUUIDPipe, Req} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDto } from "../Dto/users.dto";
import { AuthGuard } from "../auth/guards/auth.guard";
import { Request } from "express";
import { Roles } from "../decorators/roles.decorator";
import { Rol } from "../auth/roles.enum";
import { RolesGuard } from "../auth/guards/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('users')
@Controller('users')
export class UsersController{
    constructor(private readonly usersService:UsersService){}
    
    @ApiBearerAuth()
    @Get()
    @Roles(Rol.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async getUsers(@Query('page') page: string, @Query('limit') limit: string,  @Req() request: Request & {user:any}){
        console.log(request.user)

        if(page && limit){

            return await this.usersService.getUsers(Number(page), Number(limit));
        }
        return await this.usersService.getUsers(1,30);
    }

    @ApiBearerAuth()
    @Get(':id')
    @UseGuards(AuthGuard)
    async getUser(@Param('id', ParseUUIDPipe) id: string){
        return await this.usersService.getById(id)
    }


    @ApiBearerAuth()
    @Put(':id')
    @UseGuards(AuthGuard)
    async updateUser(@Param('id',ParseUUIDPipe) id:string, @Body() user:Partial<UserDto>){
        return await this.usersService.updateUser(id, user)
    }
    
    @ApiBearerAuth()
    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteUser(@Param('id', ParseUUIDPipe) id:string){
        return await this.usersService.deleteUser(id)
    }
}