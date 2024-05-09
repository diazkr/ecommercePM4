import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDto } from '../Dto/users.dto';
import { User } from '../users/users.entity';
import exp from 'constants';
import { BadRequestException } from '@nestjs/common';
import { LoginUserDto } from 'src/Dto/login.dto';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const mockUsersService: Partial<UsersService> = {
      userByEmail: () => Promise.resolve(undefined),
      createUser: (userDto: UserDto): Promise<User> =>
        Promise.resolve({
          ...userDto,
          rol: 'user',
          id: '14974113-581b-4675-b893-87585ca617',
          orders: [],
        }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //   TEST PARA EL SIGNUP

  it('debería lanzar un error cuando las contraseñas no coinciden', async () => {
    const mockUser: UserDto = {
      name: 'Karen Diaz C',
      email: 'karenDiazC@gmail.com',
      password: 'KarenDiaz0108*',
      confirmPassword: 'password',
      phone: 1234567890,
      country: 'United States',
      address: '123 Main St',
      city: 'Anytown',
    };

    await expect(service.singUp(mockUser)).rejects.toThrow(BadRequestException);
    await expect(service.singUp(mockUser)).rejects.toThrow(
      'Las contraseñas no coinciden',
    );
  });

  it('Deberia retornar credenciales incorrectas cuando el email sea undefined', async () => {
    const mockUser: LoginUserDto = {
      email: 'karenDiazC@gmail.com',
      password: 'KarenDiaz0108*',
    };

    await expect(service.signIn(mockUser.email, mockUser.password)).rejects.toThrow(BadRequestException);
    await expect(service.signIn(mockUser.email, mockUser.password)).rejects.toThrow('Credenciales incorrectas');
    
  });
});

