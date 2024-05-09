import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

// Mock del repositorio
const mockUsersRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockImplementation((user) => Promise.resolve({ ...user, id: 'generated-id' })),
  update: jest.fn(),
  remove: jest.fn()
};

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jest.clearAllMocks();  // Limpia los mocks después de cada prueba
  });

  it('Deberia retornar una lista paginada de usuarios', async () => {
    const users = Array(20).fill({ id: 'some-id', name: 'John Doe', email: 'email@test.com', password: '123456', rol: 'user' });
    mockUsersRepository.find.mockResolvedValue(users);
    const result = await service.getUsers(1, 10);
    expect(result.length).toBe(10);
    expect(usersRepository.find).toHaveBeenCalled();
  });

  it('Debe retornar un usuario por id, sin la contraseña', async () => {
    const user = { id: '1', name: 'John Doe', email: 'john@example.com', password: 'secure', rol: 'admin', orders: [] };
    mockUsersRepository.findOne.mockResolvedValue(user);
    const result = await service.getById('1');
    expect(result).toEqual({ name: 'John Doe', email: 'john@example.com', id:'1', orders: []});
    expect(usersRepository.findOne).toHaveBeenCalledWith({
      where: { id: '1' },
      relations: {
        orders: true,
      },
    });
  });



  it('Se debe borrar aun usuario satisfactoriamente', async () => {
    const user = { id: '1', name: 'John Doe', email: 'john@example.com', password: 'secure', rol: 'admin' };
    mockUsersRepository.findOneBy.mockResolvedValue(user);
    const result = await service.deleteUser('1');
    expect(result).toEqual({ message: `User with id 1 deleted successfully`, id: '1' });
    expect(usersRepository.remove).toHaveBeenCalledWith(user);
  });

});
