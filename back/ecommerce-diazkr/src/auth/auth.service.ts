import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from 'src/Dto/users.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    if (!email || !password)
      throw new BadRequestException('Credenciales incorrectas');
    const user = await this.usersService.userByEmail(email);
    if (!user) {
      throw new BadRequestException('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Credenciales incorrectas');
    }

    const userPayload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      roles: [user.rol]
    };

    const token = this.jwtService.sign(userPayload);
    return { success: 'Usuario logueado correctamente', token , userId: user.id};
  }

  async singUp(user: UserDto) {
    if(user.password !== user.confirmPassword){
        throw new BadRequestException('Las contraseñas no coinciden')
    }
    const dbUser = await this.usersService.userByEmail(user.email);

    if (dbUser) {
      throw new BadRequestException('Email ya resgistrado');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException('La contraseña no pudo ser hasheada');
    }

    const newUser = await this.usersService.createUser({ ...user, password: hashedPassword });

    const newUserDb =  await this.usersService.getById( newUser.id)



    return { success: 'Usuario creado exitosamente', user: newUserDb };
  }
}

