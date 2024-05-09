import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDto } from "src/Dto/users.dto";
import { userPreload } from "src/database/userDataBase";

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>){}

    
  async getUsers(page: number, limit:number) {

    const allusers= await this.usersRepository.find();
    const start = (page - 1)*limit;
    const end = start + limit;
    const usersList = allusers.slice(start, end).map(user => {
      const { password, ...userData } = user;
      return userData;
  });
    return usersList;
  }

  async getById(id:string) {
    const userById = await this.usersRepository.findOne({
      where:{id},
      relations:{
        orders:true,
      }
    });
    if (!userById) {
      throw new NotFoundException(`Usuario no encontrado`);
    }
    const { password, rol, ...userData } = userById;
    return userData;
  }

  async createUser( userDto: UserDto) {
    const user = this.usersRepository.create(userDto);
    const saved = await this.usersRepository.save(user);
    const {password, rol, ...userData} = saved;
    
    return userData;
  }

  async updateUser(id:string, userDto: Partial<UserDto>) {
    await this.usersRepository.update(id, userDto)
    const updateUser = await this.usersRepository.findOneBy({id});
    if(!updateUser) {
      throw new NotFoundException(`Usuario no encontrado`)
    }
    const {password,rol, ...userData} = updateUser
    return userData;
  }

  async deleteUser(id:string) {
    const existingUser = await this.usersRepository.findOneBy({id});
    if (!existingUser) {
      throw new NotFoundException(`Usuario no encontrado`);
    }
    await this.usersRepository.remove(existingUser);
    return { message: `User with id ${id} deleted successfully`, id };
  }

  async userByEmail(email:string){
    return await this.usersRepository.findOne({ where: { email } });
  }

  async seederUser(){
    const users = await this.usersRepository.find();
    const userAdmin = userPreload

    userAdmin.rol = 'admin'

    if(users.length > 0){
      console.log('No se puede precargar el usuario, ya hay creados')
    }else{
      await this.usersRepository.save(userAdmin)
    }

    console.log('Se ha precargado el usuario admin con exito')
  }



}