import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/afisha');
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/afisha/films → 200', () => {
    return request(app.getHttpServer())
      .get('/api/afisha/films')
      .expect(200);
  });

  it('POST /api/afisha/order с пустым tickets → 400', () => {
    return request(app.getHttpServer())
      .post('/api/afisha/order')
      .send({ email: 'a@b.c', phone: '+7', tickets: [] })
      .expect(400);
  });

  it('POST /api/afisha/order с невалидным UUID → 400', () => {
    return request(app.getHttpServer())
      .post('/api/afisha/order')
      .send({
        email: 'a@b.c',
        phone: '+7',
        tickets: [{ film: 'not-uuid', session: 'x', row: 1, seat: 1 }],
      })
      .expect(400);
  });

  it('POST /api/afisha/order с отрицательным row → 400', () => {
    return request(app.getHttpServer())
      .post('/api/afisha/order')
      .send({
        email: 'a@b.c',
        phone: '+7',
        tickets: [
          {
            film: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
            session: 'd290f1ee-6c54-4b01-90e6-d701748f0852',
            row: -1,
            seat: 1,
          },
        ],
      })
      .expect(400);
  });
});
