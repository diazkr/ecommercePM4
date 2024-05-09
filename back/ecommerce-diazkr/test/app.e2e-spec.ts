import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close(); // Asegúrate de cerrar la aplicación después de cada prueba
  });

  it('/ (GET)', async () => {
    // Uso de async/await para manejar la asincronía de manera explícita
    const response = await request(app.getHttpServer())
      .get('/')
      .expect(200);
    
    expect(response.text).toEqual('Hello World!');
  });


  it('POST /categories/addCategory - Success', () => {
    const newCategory = { name: 'Unique Category' };

    return request(app.getHttpServer())
      .post('/categories/addCategory')
      .send(newCategory)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'Unique Category'
        });
      });
  });

  it('POST /auth/signIn - Failure due to incorrect credentials', async () => {
    const credentials = { email: 'wrongemail@example.com', password: 'wrongpassword' };

    const response = await request(app.getHttpServer())
      .post('/auth/signIn')
      .send(credentials)
      .expect(400); // Esperamos un BadRequest debido a credenciales incorrectas

    expect(response.body).toEqual({
      statusCode: 400,
      message: 'Credenciales incorrectas',
      error: 'Bad Request'
    });
  });

  it('GET /products - Custom pagination', async () => {
    const page = 2;
    const limit = 10;
    const response = await request(app.getHttpServer())
      .get(`/products?page=${page}&limit=${limit}`)
      .expect(200);

    expect(response.body).toEqual(expect.any(Array));
    expect(response.body.length).toBeLessThanOrEqual(limit);
  });

  it('POST /auth/singUp - Success', async () => {
    const newUser = { 

      name: 'Frank Martin Caridad',
      email: 'FrankMartinCaridad@gmail.com',
      password: 'FrankMartinCaridad0108*',
      confirmPassword: 'FrankMartinCaridad0108*',
      phone: 1234567890,
      country: 'United States',
      address: '123 Main St',
      city: 'Anytown',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/singUp')
      .send(newUser)
      .expect(201);

    expect(response.body).toHaveProperty('success', 'Usuario creado exitosamente');
    expect(response.body.user).toHaveProperty('email', newUser.email);
    expect(response.body.user).not.toHaveProperty('password');
  });
});
